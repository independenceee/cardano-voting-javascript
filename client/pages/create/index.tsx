// import React, {ChangeEvent, useState} from "react";
// import axios from "axios";

// type Props = {}

// type Data = {
//     name: string,
//     description: string,
//     addressWallet: string;
// }

// const Create = function({}: Props) {

//     const [data, setData] = useState<Data>({
//         name: "",
//         description: "",
//         addressWallet: "hhfkjfkyfuyt",
//     })

//     const [image, setFile] = useState<File>(null!);

//     const handleChangeInputFile = function(event: ChangeEvent<HTMLInputElement> ) {
//         event.preventDefault();
//         setData((prev: Data): Data => {
//             return {
//                 ...prev,
//                 [event.target.name]: event.target.value,
//             }
//         })
//     }
//     const changeInput = function(event: ChangeEvent<HTMLInputElement>) {
//         if(event.target.files != null) {
//             setFile(event.target.files[0]);
//         }
//     }
//     const handleSubmit = async function() {
//         try {

//             const formData = new FormData();
//             formData.append("name",data.name);
//             formData.append("description",data.description);
//             formData.append("addressWallet", data.addressWallet);
//             formData.append("image", image)
//             console.log(image)

//             await axios.post("http://localhost:8000/api/v1/ballots",formData ).then(() => console.log("thanh cong"))
//         } catch(error) {
//             console.log(error);
//         }
//     }

//     return (
//         <>
//             <div>
//                 <div>
//                     <div>
//                         <label htmlFor="">Name</label>
//                         <input type="text" name="name" onChange={handleChangeInputFile}/>
//                         <span></span>
//                     </div>
//                     <div>
//                         <label htmlFor="">Description</label>
//                         <input type="text" name="description"onChange={handleChangeInputFile}/>
//                         <span></span>
//                     </div>
//                 </div>
//                 <div>
//                     <label htmlFor="">File Upload</label>
//                     <input
//                 onChange={changeInput}
//                 type="file"
//                 />
//                 </div>

//                 <button onClick={handleSubmit}>Submit</button>
//             </div>
//         </>
//     )
// }

// export default Create;

import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { Ballot } from "../../type";
import { toast } from "react-toastify";

type Props = {};

const Create = function ({}: Props) {
    const [imagePath, setImagePath] = useState<string | null>(null!);
    const [image, setImage] = useState<File>(null!);
    const [fileName, setFileName] = useState<string>("Choose the file");
    const [ballot, setBallot] = useState<Ballot>({
        name: "",
        description: "",
        addressWallet:
            "addr_test1qrxssz5390fwsk80c5z7m0hzj59zw6fdxaunaqhcu3kaqaeuu07v2ccqeyv2vfny59tjcz7wc46x6kj7r2w6cxxhhz0s586r9g",
    });

    const handleChangeFile = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        if (event.target.files !== null) {
            setImage(event.target.files[0]);
            setImagePath(URL.createObjectURL(event.target.files[0]));
        }
    };
    const handleChooseFile = function () {
        const fileImageElement: any = document.querySelector(".file__input");
        fileImageElement?.click();
    };

    const handleChangeInputElement = function (
        event: ChangeEvent<HTMLInputElement>,
    ) {
        event.preventDefault();
        setBallot(function (previous: Ballot): Ballot {
            return {
                ...previous,
                [event.target.name]: event.target.value,
            };
        });
    };

    const handleSubmit = async function () {
        try {
            const formBallot = new FormData();
            const { name, description, addressWallet } = ballot;
            formBallot.append("name", name);
            formBallot.append("description", description);
            formBallot.append("addressWallet", addressWallet);
            formBallot.append("image", image);
            await axios.post(
                `http://localhost:8000/api/v1/ballots`,
                formBallot,
            );
            await toast.success("Upload Success !");
        } catch (error) {
            toast.error("Upload Error !");
            console.log(error);
        }
    };
    return (
        <>
            <div>
                <div>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChangeInputElement}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="description"
                        onChange={handleChangeInputElement}
                    />
                </div>
            </div>
            <div onClick={() => handleChooseFile()}>
                <input
                    type="file"
                    className="file__input"
                    accept="image/*"
                    hidden
                    onChange={handleChangeFile}
                />
                {imagePath ? (
                    <img
                        className="w-full h-full object-cover"
                        src={imagePath}
                        alt="Image"
                    />
                ) : (
                    <>{fileName}</>
                )}
            </div>

            <button onClick={handleSubmit}>Create Ballot</button>
        </>
    );
};

export default Create;
