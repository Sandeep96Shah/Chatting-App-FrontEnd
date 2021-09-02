const API_ROOT = 'https://baatkre.herokuapp.com';

export const APIUrls = {
    signIn : () => `${API_ROOT}/userSession`,
    validate : () => `${API_ROOT}/userSession/validate`,
    users : () => `${API_ROOT}/allusers`,
    friends : () => `${API_ROOT}/userFriends`,
    search : () => `${API_ROOT}/searchFriend`,
    makeFriend: (from, to) => `${API_ROOT}/friendship/${from}/${to}`,
    chatroom : (from, to) => `${API_ROOT}/private/${from}/${to}/chatroom`,
    privateMessage : (to) => `${API_ROOT}/privateMessage/${to}/`,
    addMessage : (to) => `${API_ROOT}/privateMessage/${to}/add`,
}

