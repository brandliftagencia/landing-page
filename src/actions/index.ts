import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';
import { RESEND_API_KEY } from 'astro:env/server';

// Initialize Resend with proper error handling
if (!RESEND_API_KEY) {
  console.error('RESEND_API_KEY is not defined in environment variables');
}

const resend = new Resend(RESEND_API_KEY);

export const server = {
  sendEmail: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email('Please enter a valid email address'),
      privacy: z.string().transform(val => val === 'true').refine(val => val === true, 'You must accept the privacy policy')
    }),
    handler: async (input) => {
      try {
        // Check if RESEND_API_KEY is available
        if (!RESEND_API_KEY) {
          console.error('RESEND_API_KEY is missing in production');
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Email service configuration error. Please contact support.',
          });
        }

        console.log('Attempting to send email for:', input.email);
        
        const { data, error } = await resend.emails.send({
          from: 'BrandLift <no-reply@marketing.brandlift.pe>', // Replace with your verified domain
          to: ['hann@brandlift.pe'], // Replace with your business email
          subject: 'New Lead from BrandLift Website',
          html: `
            <h2>New Lead Registration</h2>
            <p><strong>Email:</strong> ${input.email}</p>
            <p><strong>Privacy Policy Accepted:</strong> ${input.privacy ? 'Yes' : 'No'}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Source:</strong> BrandLift Landing Page</p>
          `,
        });

        if (error) {
          console.error('Resend API error:', error);
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: 'Failed to send email. Please try again later.',
          });
        }

        console.log('Email sent successfully:', data);
        return { success: true, message: 'Thank you! We will contact you soon.' };
      } catch (error) {
        console.error('Action error:', error);
        
        // If it's already an ActionError, re-throw it
        if (error instanceof ActionError) {
          throw error;
        }
        
        // For other errors, provide a generic message
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred. Please try again.',
        });
      }
    },
  }),
};
