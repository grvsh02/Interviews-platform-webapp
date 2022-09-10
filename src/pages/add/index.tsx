import React, {useEffect, useState} from 'react';
import Card from "../../components/card";
import LabelTextInput from "../../components/labelTextInput";
import Dropdown from "../../components/dropdown";
import Button from "../../components/button";
import Modal from "../../components/modal";
import TagsInput from "../../components/tagInput";
import {toast} from "react-toastify";
import  { useNavigate } from 'react-router-dom'
import GraphqlFetch from "../../utils/graphqlFetch";
import graphqlFetch from "../../utils/graphqlFetch";

export type UserProps = {
    firstName: string,
    lastName: string,
    email: string,
    phone?: string,
    status: string,
    role: string,
}

const AddPage = () => {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = React.useState(false);

    const [roles, setRoles] = useState([''])
    const [newTags, setNewTags] = useState([])
    const [reload, setReload] = useState(false)

    // @ts-ignore
    const [user, setUser] = useState<UserProps>(null)

    useEffect(() => {
        GraphqlFetch({
            query: `query {
                roles {
                    role
                }
            }`,
        }).then((response) => {
            let rolesFetched: any[] = []
            response.data.roles.map((role: any) => {
                rolesFetched = [...rolesFetched, role.role]
            })
            setRoles(rolesFetched)
        })
    }, [reload])

    const handleAdd = () => {
        setIsOpen(false);
        GraphqlFetch({
            query:`mutation($roles: [String!]!){
                addRoles(roles: $roles)
            }`,
            variables: {"roles" : newTags}
        }).then((respose) => {
            if (respose.data.addRoles){
                toast.success("Roles Added !", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        })
        setReload(!reload)
    }

    const handleSave = () => {
        setUser({...user})
        graphqlFetch({
            query: `mutation($user: UserInput!){
                addUser(user: $user)
            }`,
            variables: {"user": user}
        }).then((response) => {
            if (response.data.addUser){
                toast.success("User Added !", {
                    position: toast.POSITION.TOP_RIGHT
                });
                navigate('/');
            }
        })
    }

    return (
        <div className="flex flex-row justify-center h-full">
            <div className="w-2/3 h-full ">
                <Card className="m-5">
                    <div className="p-10">
                        <div className="text-4xl align-middle font-semibold">Add Candidate</div>
                        <div className="align-middle h-full">
                            <LabelTextInput label="First Name" type="text" className="mt-10" placeholder="" required={true} onChange={(fname) => setUser({...user,firstName: fname})}/>
                            <LabelTextInput label="Last Name" type="text" className="mt-10" placeholder="" onChange={(lname) => setUser({...user,lastName: lname})}/>
                            <LabelTextInput label="Email" type="email" className="mt-10" placeholder="" required={true} onChange={(email) => setUser({...user,email: email})}/>
                            <LabelTextInput label="Phone Number" type="text" className="mt-10" placeholder="" onChange={(no) => setUser({...user,phone: no})}/>
                            <Dropdown
                                label="Select Status"
                                className="mt-10"
                                placeholder="Showing All Tags"
                                items={["inReview", "Accepted", "Rejected"]}
                                onChange={(status) => setUser({...user,status: status})}
                            />
                            <Dropdown
                                label="Select Role"
                                className="mt-10"
                                placeholder="Showing All Tags"
                                items={roles}
                                hasButton={true}
                                buttonText="Add +"
                                onButtonClick={() => setIsOpen(true)}
                                onChange={(role) => {
                                    setUser({...user, role: role});
                                    console.log(user, role)
                                }}
                            />
                            <div className="mt-10">
                                Paste all the client GSTIN in the box which you like to import. Each GSTIN should be in a new line.<br/>
                                QRMP prefrences along with GST return status from Jan 2021 till date will be imported automatically.
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button className='m-2' onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="text-2xl font-semibold">Add Roles</div>
                <div className="text-lg mt-5"><TagsInput setNewTags={(data: any) => setNewTags(data)}/></div>
                <div className="flex justify-end mt-10">
                    <Button className="mr-5" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button className="bg-red-500" onClick={() => {handleAdd()}}>Add</Button>
                </div>
            </Modal>
        </div>
    );
}

export default AddPage;