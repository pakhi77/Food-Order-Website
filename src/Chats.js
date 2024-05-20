import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <df-messenger
        oauth-client-id="517609173100-kn8inat3ti7l9s98chj6uesklfin7deu.apps.googleusercontent.com"
        location="us-central1"
        project-id="red-bruin-417610"
        agent-id="2096196d-caaa-4f52-a879-9ccfbf2f4732"
        language-code="en"
        max-query-length="-1"
        chat-title="food order assistant"
        style={{ zIndex: 999, position: 'fixed', bottom: 0, right: 0, top: 0, width: '350px' }}
      ></df-messenger>
    </div>
  );
};

export default Chatbot;
