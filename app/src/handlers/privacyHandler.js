export function getPrivacyContent() {
  return {
    title: 'Privacy Policy',
    lastUpdated: 'June 2026',
    siteName: 'Taranather Golpo Archive',
    siteUrl: 'https://taranather-golpo-archive.vercel.app/',
    intro:
      'Your privacy is deeply important to us. Because this application is a non-commercial, fan-made index, our approach to privacy is simple: we do not collect, store, or share your personal data.',
    sections: [
      {
        heading: '1. No Data Collection or Databases',
        paragraphs: [
          'This application does not require a user login, account creation, or any personal details (such as your name, email address, or location). There is no backend database attached to this website. The app simply reads a static, pre-made list of public YouTube links and displays them in a clean visual interface.',
        ],
      },
      {
        heading: '2. Local Storage & Browser Cache',
        paragraphs: [
          'Any actions you take on the site — such as marking a story as opened, saving preferences (like dark mode or card layout), or similar — are processed and stored entirely on your own device using your browser\'s local cache or local storage.',
        ],
        list: [
          'This data never leaves your device.',
          'We cannot see, access, or alter this data.',
          'You can clear this data at any time by clearing your browser\'s history or cache.',
        ],
      },
      {
        heading: '3. Third-Party Links and Embedded Content',
        paragraphs: [
          'Because this app indexes YouTube videos, clicking to play a video may load content directly from YouTube\'s servers or redirect you to YouTube. YouTube and its parent company, Google, may track your interactions, place cookies, or collect telemetry according to their own privacy policies. We do not control and are not responsible for how YouTube handles your data.',
        ],
      },
      {
        heading: '4. Hosting & Infrastructure',
        paragraphs: [
          'This website is hosted using Vercel. Like almost all web hosting providers, Vercel automatically collects standard, non-identifying server logs (such as your IP address, browser type, and time of access) to safely serve the website files and monitor technical performance. We do not use these logs to track individual users.',
        ],
      },
      {
        heading: '5. Contact Information',
        paragraphs: [
          'If you have any questions about this privacy notice, or if you are a copyright holder with questions about the indexed links, please reach out using the contact options below.',
        ],
      },
    ],
    contact: {
      email: 'deepraj.developer@gmail.com',
      github: 'https://github.com/DeeprajDeveloper/taranather-golpo-archive',
    },
  };
}
