import React from 'react'
import { size, map } from 'lodash'
import {useNavigate} from 'react-router-dom'
import ImageNotFound from "../../../assests/png/avatar.png";
import { Image } from 'semantic-ui-react';
import './ListUsers.scss';



const ListUsers = ({ users, setShowModal }) => {
    const navigate = useNavigate();

    const goToPerfile = (username) => {
        navigate(`/${username}`);
        setShowModal(false);
    }
  return (
    <div className='list-users'>
      {size(users) === 0 ? (
        <p className='list-users__not-users'>No se han encontrado usuarios</p>
      ) : (
        map(users, (user, index) => (
         
            <div onClick={() => goToPerfile(user.username)} key={index} className="list-users__user">
              <Image src={user.avatar || ImageNotFound} avatar />

              <div>
                <p>{user.name}</p>
                <p>{user.username}</p>
              </div>
            </div>
         
        ))
      )}
    </div>
  )
}

export default ListUsers