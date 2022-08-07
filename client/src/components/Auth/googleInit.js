export default GoogleAuth;

export const initClient = () => {
  gapi.client.init({
      'apiKey': process.env.REACT_APP_GOOGLE_API_KEY,
      'clientId': process.env.REACT_APP_GOOGLE_CLIENT_ID,
      'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
  }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus);
  });
}
