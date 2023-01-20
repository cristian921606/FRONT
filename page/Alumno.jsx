import { gql, useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '../auth'
import { Alumno } from '../component/Alumno'

const GET_ALUMNO = gql`
query GetAlumno {
getAllAlumno {
id_usuario
nombres
apellidoP
apellidoM
edad
num_contacto
}
}
`;


export const Alumno = () => {

    const navigate = useNavigate()

    const { loading, error, data } = useQuery(GET_ALUMNO, {
        onError: (err) => {
            switch (err.message) {
                case 'jwt expired':
                    AuthService.logout()
                    navigate('/login')
                    window.location.reload()
                    break;
                // TODO: resolver otros casos de error
                default:
                    break;
            }
        }
    })

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
        <div className="container">
            <div className="row">
                {data.getAllHuespedes.map((Alumno) => <Alumno key={Alumno.id_usuario} data={Alumno} />)}
            </div>
        </div>
    )
} 