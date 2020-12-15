import React from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { signOut } from '../../store/modules/auth/actions';
import { updateProfileRequest } from '../../store/modules/user/actions';
import AvatarInput from './AvatarInput';

import { Content } from './styles';

export default function Profile(){
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);
    const loading = useSelector(state => state.auth.loading);

    function handleSubmit(data){
        dispatch(updateProfileRequest(data));
    }

    function handledSignOut(){
        dispatch(signOut());
    }

    return(
        <Content>
            <Form initialData={profile} onSubmit={handleSubmit}>
                <AvatarInput name="avatar_id" />
                <Input name="name" placeholder="Nome Completo" />
                <Input name="email" placeholder="Seu endereço de e-mail" />
                <hr/>
                <Input type="password" name="oldPassword" placeholder="Sua senha atual" />
                <Input type="password" name="password" placeholder="Nova senha" />
                <Input type="password" name="confirmPassword" placeholder="Confirmação de senha"/>

                <button type="submit">{ loading ? 'Carregando...' : 'Atualizar perfil' }</button>
            </Form>
            <button type="submit" onClick={handledSignOut}> Sair de GoBarber </button>
        </Content>
    );
}
