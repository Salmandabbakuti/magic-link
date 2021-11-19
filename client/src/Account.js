import { useState, useEffect } from 'react'
import { GraphQLClient, gql } from 'graphql-request';



export default function Account(props) {
  localStorage.setItem('TOKEN', props.match.params.token);
  const token = localStorage.getItem('TOKEN');

  const client = new GraphQLClient('http://localhost:4000', {
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({ firstName: '', lastName: '', phone: '', email: '' });


  const UPDATE_PROFILE_MUTATION = gql`
    mutation updateProfile($data: updateProfileInput!) {
      updateProfile(data: $data)
    }
  `;
  const GET_MY_PROFILE_QUERY = gql`
    query getMyProfile{
      getMyProfile
    }`;


  useEffect(() => {
    // can get username from url through props);
    localStorage.setItem('TOKEN', props.match.params.token);
    getMyProfile();
  }, [])

  const getMyProfile = () => {
    setLoading(true);
    client.request(GET_MY_PROFILE_QUERY, {}).then((data) => {
      setLoading(false);
      setUser(data.getMyProfile);
      localStorage.setItem('user', JSON.stringify(data.getMyProfile));
    }).catch((err) => {
      setLoading(false);
      console.log(err)
    });
  }

  const updateProfile = async (user) => {
    setLoading(true);
    const { firstName, lastName, phone } = user;
    client.request(UPDATE_PROFILE_MUTATION, { data: { firstName, lastName, phone } }).then(data => {
      setLoading(false);
      alert('Profile Updated Successfully');
    }).catch((err) => {
      setLoading(false);
      console.log('Error updating profile')
    });
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="firstName">FirstName</label>
        <input
          id="firstName"
          type="text"
          value={user.firstName || ''}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="lastName">LastName</label>
        <input
          id="lastName"
          type="lastName"
          value={user.lastName || ''}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="phone"
          value={user.phone || ''}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user.email} disabled />
      </div>
      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile(user)}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => { localStorage.clear(); props.history.push("/") }}>
          Sign Out
        </button>
      </div>
    </div>
  )
}