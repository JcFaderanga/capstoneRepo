const [user, setUser] = useState(null);

    const setAuth = authUser=>{
        setUser(authUser);
    }

    const setUserData = userData =>{
        setUser({...userData});
    }