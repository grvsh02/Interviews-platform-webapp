import React, {useEffect} from "react";
import Card from "../../components/card";
import {useNavigate, useParams} from "react-router-dom";
import GraphqlFetch from "../../utils/graphqlFetch";
import Avatar from "../../components/avatar";
import {UserProps} from "../add";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan, faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import GraphQLFetch from "../../utils/graphqlFetch";
import {toast} from "react-toastify";

const UserPage = () => {
    const { id }: any = useParams();
    const navigate = useNavigate();
    // @ts-ignore
    const [user, setUser] = React.useState<UserProps>(null);
    const [reload, setReload] = React.useState(false);

    useEffect(() => {
        GraphqlFetch({
            query: `query {
                user(id: ${id}) {
                    id
                    firstName
                    lastName
                    email
                    phone
                    status
                    role
                }
            }`
        }).then((response) => {
            setUser(response.data.user);
        })
    }, [reload]);

    const handleAccept = (variables: any) => {
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

    const handleDelete = (variables: any) => {
        GraphQLFetch({
            query: `
                mutation ($id: Int!){
                    deleteUser(id: $id)
                }
            `,
            variables
        }).then((res) => {
            if (res.data.deleteUser) {
                setReload(!reload);
            }
            navigate('/');
            toast.success("Deleted successfully !",
                {
                    position: toast.POSITION.TOP_RIGHT
                })
        });
    }

    return (
        <div className="flex flex-row justify-center h-full">
            <div className="w-2/3 h-full flex flex-col">
                <Card className="m-5 w-full">
                    <div className="p-10">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row">
                                <div className="mr-5">
                                    <Avatar size='base' />
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-2xl font-semibold">{user?.firstName} {user?.lastName}</div>
                                    <div className="text-lg">{user?.email}</div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-lg font-semibold">Status</div>
                                <div className="text-lg">{user?.status}</div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between mt-10">
                            <div className="flex flex-col">
                                <div className="text-lg font-semibold">Phone</div>
                                <div className="text-lg">{user?.phone}</div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-lg font-semibold">Role</div>
                                <div className="text-lg">{user?.role}</div>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="m-5 w-full">
                    <div className="p-10">
                        <div className="flex flex-row justify-between">
                            <div className="text-2xl font-semibold">Actions</div>
                            <div className="flex flex-row">
                                <div className="mr-5">
                                    <FontAwesomeIcon icon={faTrashCan} className="cursor-pointer text-red-500 text-2xl"
                                                     onClick={() => {handleDelete({"id": parseInt(id)})}}/>
                                </div>
                                {user?.status === 'inReview' && (
                                    <div className="mr-5">
                                        <FontAwesomeIcon icon={faCheck} className="cursor-pointer text-green-500 text-2xl"
                                                         onClick={() => {handleAccept({"id": parseInt(id), "status": "Accepted"})}}/>
                                    </div>
                                )}
                                {user?.status === 'inReview' && (
                                    <div className="mr-5">
                                        <FontAwesomeIcon icon={faTimes} className="cursor-pointer text-red-500 text-2xl"
                                                         onClick={() => {handleAccept({"id": parseInt(id), "status": "Rejected"})}}/>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default UserPage;