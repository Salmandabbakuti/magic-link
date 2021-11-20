import { useState } from 'react'
import { gql } from 'graphql-request';
import './index.css'

export default function Home({ client }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const SEND_MAGICLINK_MUTATION = gql`
    mutation sendMagicLink($email: String!) {
      sendMagicLink(email: $email)
    }`;

  const handleSendMagicLink = async (email) => {
    if (!email) return;
    setLoading(true);
    client.request(SEND_MAGICLINK_MUTATION, { email })
      .then((data) => {
        setLoading(false);
        setEmail('');
        console.log('mutation response:', data);
        alert('magic link sent to email');
      })
      .catch((err) => {
        setLoading(false);
        console.log('mutation error:', err)
      });
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Passwordless Magiclink App</h1>
        <p className="description">Sign in via magic link with your email below</p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleSendMagicLink(email)
            }}
            className={'button block'}
            disabled={loading}
          >
            {loading ? <span>Loading</span> : <span>Send magic link</span>}
          </button>
        </div>
      </div>
    </div>
  )
}