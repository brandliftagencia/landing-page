import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  sendEmail: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email('Please enter a valid email address'),
      privacy: z.string().transform(val => val === 'true').refine(val => val === true, 'You must accept the privacy policy')
    }),
    handler: async (input) => {
      try {
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
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: 'Failed to send email. Please try again later.',
          });
        }

        return { success: true, message: 'Thank you! We will contact you soon.' };
      } catch (error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred. Please try again.',
        });
      }
    },
  }),
};
