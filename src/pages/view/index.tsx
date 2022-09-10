import React, {useEffect} from 'react';
import Card from "../../components/card";
import Button from "../../components/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import Searchbar from "../../components/searchbar";

import {Link} from "react-router-dom";
import Modal from "../../components/modal";
import { toast } from 'react-toastify';

import UserTable from "./userTable";

const ViewPage = () => {

    const [isOpen, setIsOpen] = React.useState(false);

    const handleDelete = () => {
        setIsOpen(false);
        toast.success("Deleted successfully !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const [keyword, setKeyword] = React.useState('');

    useEffect(() => {}, [keyword])


    return (
        <div>
            <div className="m-10">
                <div className="text-4xl font-semibold">All GSTINs</div>
                <div className="w-full flex justify-between mt-10">
                    <Link to="/add"><Button>Add Candidate</Button></Link>
                    <Searchbar onSearch={setKeyword}/> {/* add onSearch parameter and add a function to call api for searching*/}
                    <Button><FontAwesomeIcon icon={faDownload} className="mt-1"/>Export as XLSX</Button>
                </div>
                <div>
                    <Card className="mt-10">
                        <div>
                            <UserTable keyword={keyword} />
                        </div>
                    </Card>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="text-2xl font-semibold">Delete GSTIN</div>
                <div className="text-lg mt-5">Are you sure you want to delete this GSTIN?</div>
                <div className="flex justify-end mt-10">
                    <Button className="mr-5" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button className="bg-red-500" onClick={() => {handleDelete()}}>Delete</Button>
                </div>
            </Modal>
        </div>
    );
}

export default ViewPage;