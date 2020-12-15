export function updateProfileRequest(data){
    return{
        type: '@user/UPDATE_PROFILE_RESQUEST',
        payload: { data },
    }
}

export function updateProfileSuccess(profile){
    return{
        type: '@user/UPDATE_PROFILE_SUCCESS',
        payload: { profile },
    }
}

export function updateProfileFailure(){
    return{
        type: '@user/UPDATE_PROFILE_FAILURET',
    }
}
