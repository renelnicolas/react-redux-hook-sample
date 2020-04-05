import BusinessIcon from '@material-ui/icons/Business';
import GroupIcon from '@material-ui/icons/Group';
import Person from "@material-ui/icons/Person";


import Home from '../pages/Home';

import CompanyList from '../pages/Company/List';
import CompanyEdit from '../pages/Company/Edit';

import UserList from '../pages/User/List';
import UserEdit from '../pages/User/Edit';

import NotFound from '../pages/NotFound'
import UserProfil from '../pages/User/Profil';

export const routes = [
    {
        path: "/",
        name: "Home",
        exact: true,
        component: Home,
        roles: ['USER']
    },
    {
        path: "/companies",
        name: "Companies",
        exact: true,
        icon: BusinessIcon,
        component: CompanyList,
        roles: ['ADMIN']
    },
    {
        path: "/company",
        name: "Company",
        exact: true,
        component: CompanyEdit,
        roles: ['ADMIN']
    },
    {
        path: "/company/:id",
        name: "Company",
        exact: false,
        component: CompanyEdit,
        roles: ['ADMIN']
    },
    {
        path: "/users",
        name: "Users",
        exact: true,
        icon: GroupIcon,
        component: UserList,
        roles: ['ADMIN']
    },
    {
        path: "/user",
        name: "User",
        exact: true,
        component: UserEdit,
        roles: ['ADMIN']
    },
    {
        path: "/user/:id",
        name: "User",
        exact: false,
        component: UserEdit,
        roles: ['ADMIN']
    },
    {
        path: "/profile",
        name: "Profile",
        exact: true,
        icon: Person,
        component: UserProfil,
        roles: ['USER']
    },
    {
        name: "NotFound",
        component: NotFound,
    },
];
