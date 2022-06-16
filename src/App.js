/* eslint-disable react-hooks/exhaustive-deps */
import { PageRoutes } from './routes/PageRoutes';
import '@fontsource/exo-2/500.css';
import '@fontsource/overpass/400.css';
import { Box } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setUserData } from './features/auth/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database } from './firebase/firebaseConfig';

import { getDoc, doc } from 'firebase/firestore';

function App() {
  const dispatch = useDispatch();

  onAuthStateChanged(auth, async user => {
    if (user) {
      const userId = user.uid;
      const userObj = await getDoc(doc(database, `users/${userId}`));
      const userData = userObj.data();

      if (userData) {
        dispatch(setUserData(userData));
      }
    }
  });

  return (
    <Box>
      <PageRoutes />
    </Box>
  );
}

export default App;
