import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '../../assets/logo.svg';

import { signUpRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
    name: Yup.string()
         .required('Nome completo é deve ser preenchido!'),
    email: Yup.string()
          .email('Insira um e-mail válido!')
          .required('O e-mail deve ser informado!'),
    password: Yup.string().min(6, 'A senha deve conter no minimo 6 caracteres.').required('A senha deve ser informado!'),
});

export default function Signup(){
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    function handleSubmit({ name, email, password }){
      dispatch(signUpRequest(name, email, password));
    }

    return(
        <>
          <img src={logo} alt="Gobarber" />

          <Form schema={schema} onSubmit={handleSubmit}>
              <Input name="name" type="text" placeholder="Seu Nome completo" />
              <Input name="email" type="email" placeholder="Seu e-mail" />
              <Input name="password" type="password" placeholder="Sua senha" />

              <button type="submit">{ loading ? 'Carregando...' : 'Criar conta' } </button>
              <Link to="/">Já tenho login</Link>
          </Form>
        </>
    );
}
