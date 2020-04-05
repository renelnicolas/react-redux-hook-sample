import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

// MODELS
import BreadcrumbPath from '../../_models/BreadcrumbPath';

// REDUX ACTIONS
import allActions from '../../_actions/index';

const Home = (props) => {
    const { match } = props;

    const dispatch = useDispatch();

    const breadcrumb = new BreadcrumbPath(match.url, [])

    // call once per loading page
    useEffect(() => {
        dispatch(allActions.breadcrumbActions.changeView(breadcrumb))
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            Home
        </div>
    )
}

export default Home;
