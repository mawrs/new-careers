import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { type, comment } = req.body;

    console.log('Received feedback:', { type, comment });

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const feedbackTypeDisplay = type === 'thumbs-up' ? 'Thumbs Up' : type === 'thumbs-down' ? 'Thumbs Down' : 'General';

    try {
      await transporter.sendMail({
        from: '"NewCareer.fyi Feedback" <newcareers.fyi@gmail.com>',
        to: "tejedam21@gmail.com",
        subject: `New Feedback: ${feedbackTypeDisplay}`,
        text: `Feedback type: ${feedbackTypeDisplay}\n\nComment: ${comment}`,
        html: `<p><strong>Feedback type:</strong> ${feedbackTypeDisplay}</p><p><strong>Comment:</strong> ${comment}</p>`,
      });

      res.status(200).json({ message: 'Feedback sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending feedback', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
