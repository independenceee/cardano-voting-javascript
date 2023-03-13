import React, {ChangeEvent, useState} from "react";
import axios from "axios";


type Props = {}

type Data = {
    name: string,
    description: string,
    addressWallet: string;
}

const Create = function({}: Props) {

    const [data, setData] = useState<Data>({
        name: "",
        description: "",
        addressWallet: "hhfkjfkyfuyt",
    })

    const [image, setFile] = useState<File>(null!);

    const handleChangeInputFile = function(event: ChangeEvent<HTMLInputElement> ) {
        event.preventDefault();
        setData((prev: Data): Data => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }
    const changeInput = function(event: ChangeEvent<HTMLInputElement>) {
        if(event.target.files != null) {
            setFile(event.target.files[0]);
        }
    }
    const handleSubmit = async function() {
        try {
            
            const formData = new FormData();
            formData.append("name",data.name);
            formData.append("description",data.description);
            formData.append("addressWallet", data.addressWallet);
            formData.append("image", image)
            console.log(image)

            await axios.post("http://localhost:8000/api/v1/ballots",formData ).then(() => console.log("thanh cong"))
        } catch(error) {
            console.log(error);
        }
    }

    

    return (
        <>
            <div>
                <div>
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="text" name="name" onChange={handleChangeInputFile}/>
                        <span></span>
                    </div>
                    <div>
                        <label htmlFor="">Description</label>
                        <input type="text" name="description"onChange={handleChangeInputFile}/>
                        <span></span>
                    </div>
                </div>
                <div>
                    <label htmlFor="">File Upload</label>
                    <input 
                onChange={changeInput}
                type="file"
                />
                </div>

                <button onClick={handleSubmit}>Submit</button>
            </div>
        </>
    )
}

export default Create;