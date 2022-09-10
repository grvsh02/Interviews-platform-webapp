import React, {useEffect} from "react";
import DataTable from "react-data-table-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan, faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import StatusTag from "../../components/statusTag";
import  { useNavigate } from 'react-router-dom'
import GraphQLFetch from "../../utils/graphqlFetch";

const customStyles = {
    rows: {
        style: {
            minHeight: '62px',
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',

        },
    },
    cells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
};

const QUERY = `
      query ($keyword: String){
        users(keyword: $keyword){
            users{
                id
                email
                firstName
                lastName
                isBanned
                phone
                status
                role
                createdAt
            }
        }
      }`;


const UserTable = ({keyword = ""}) => {

    const navigate = useNavigate();

    const [users, setUsers] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [reload, setReload] = React.useState(false);

    useEffect(() => {
        GraphQLFetch({
            query: QUERY,
            variables: { keyword }
        }).then((data) => {
            if (data.errors) {
                setError(data.errors);
            }
            else setUsers(data.data.users.users);
        });
    }, [keyword, reload]);


    const handleAccept = (variables) => {
        GraphQLFetch({
            query: `
                mutation ($id: Int!, $status: String!){
                    updateUserStatus(id: $id, status: $status)
                }
            `,
            variables
        }).then((res) => {
            if (res.data.updateUserStatus) {
                setReload(!reload);
            }
        });
    }

    const columns = [
        {
            name: 'Name',
            selector: (row) => row.firstName + ' ' + row.lastName,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
        },
        {
            name: 'Phone No.',
            selector: (row) => row.phone,
        },
        {
            name: 'Role',
            selector: (row) => row.role,
        },
        {
            name: 'Registration Date',
            selector: (row) => row.createdAt,
        },
        {
            name: 'Banned',
            selector: (row) => row.isBanned ? 'Yes' : 'No',
        },
        {
            name: 'Status',
            selector: (row) => <StatusTag status={row.status}/>,
        },
        {
            name: 'Actions',
            selector: (row) => {
                return (
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faTrashCan} size={'2x'} className="cursor-pointer"
                                         onClick={() => {}}/>
                        <FontAwesomeIcon icon={faCheck} size={'2x'} className="cursor-pointer ml-2" 
                                         onClick={() => {handleAccept({"id": parseInt(row.id), "status": "Accepted"})}}/>
                        <FontAwesomeIcon icon={faTimes} size={'2x'} className="cursor-pointer ml-2"
                                         onClick={() => {handleAccept({"id": parseInt(row.id), "status": "Rejected"})}}/>
                    </div>
                    )
            },
        }

    ]

    if (error) {
        return <p>Error :(</p>;
    }

    if (users) {
        return (
            <DataTable
                columns={columns}
                data={users}
                highlightOnHover={true}
                customStyles={customStyles}
                pagination={true}
                onRowClicked={(row) => {navigate('/users/' + row.id)}}
            />
        );
    }

    return <p>Loading...</p>;

}

export default UserTable;