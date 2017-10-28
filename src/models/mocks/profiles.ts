import { Profile } from "../profile/profile.interface";

const profile_list: Profile[]
    = [
        { firstName: "adnan", lastName: "chowdhury", email: 'adnan@chow.com', avatar: 'assets/img/avatar.png', dateOfBirth: new Date() },
        { firstName: "mesbha", lastName: "udding", email: 'mesbha@udiing.com', avatar: 'assets/img/avatar.png', dateOfBirth: new Date() },
        { firstName: "salma", lastName: "jahan", email: 'salma@jahan.com', avatar: 'assets/img/avatar.png', dateOfBirth: new Date() },
        { firstName: "asad", lastName: "babu", email: 'asad@babu.com', avatar: 'assets/img/avatar.png', dateOfBirth: new Date() }
    ];

export const PROFILE_LIST = profile_list;