import React, { useState, useEffect } from 'react';
import ModalBasic from '../../../Modal/ModalBasic';
import { size } from 'lodash';
import ListUsers from '../../ListUsers/ListUsers';
import { GET_FOLLOWERS, FOLLOWING } from '../../../../gql/follow';
import { useQuery } from '@apollo/client/react';
import './Followers.scss';

const Followers = ({ getUser, totalPublications }) => {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [childrenModal, setChildrenModal] = useState(null);


    const { loading, data, startPolling, stopPolling } = useQuery(GET_FOLLOWERS, {
        variables: { username: getUser }
    });
    const { data: dataFollowing, loading: loadingFollowing, startPolling: startPollingFollowing, stopPolling: stopPollingFollowing } = useQuery(FOLLOWING, {
        variables: { username: getUser }
    });


    useEffect(() => {
        startPolling(1000);
        return () => stopPolling();
    }, [startPolling, stopPolling]);

    useEffect(() => {
        startPollingFollowing(1000);
        return () => stopPollingFollowing();
    }, [startPollingFollowing, stopPollingFollowing]);


    if (loading || loadingFollowing) return null;




    const { getFollowers } = data
    const { getFollowing } = dataFollowing


    const openModalFollowers = () => {
        setTitle('Seguidores');
        setChildrenModal(<ListUsers users={getFollowers} setShowModal={setShowModal} />);
        setShowModal(true);
    }


    const openFollowers = () => {
        setTitle('Seguidos');
        setChildrenModal(<ListUsers users={getFollowing} setShowModal={setShowModal} />);
        setShowModal(true);
    }



    return (
        <>
            <div className='followers'>
                <p><span>{totalPublications}</span> publicaciones</p>
                <p className='link' onClick={openModalFollowers}><span>{size(getFollowers)}</span>{size(getFollowers) > 1 || size(getFollowers) === 0 ? " Segidores" : " Segidor"}</p>
                <p className='link' onClick={openFollowers}><span>{size(getFollowing)}</span> seguidos</p>
            </div>

            <ModalBasic show={showModal} setShow={setShowModal} title={title}>
                {childrenModal}
            </ModalBasic>

        </>
    )
}

export default Followers