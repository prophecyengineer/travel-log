
//letting nextjs know this is client side code
// this is a client side only component, we cannot be importing anything attached to the database here
// we created a seperation of concerns 
'use client'
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form";
import { TravelLog, TravelLogKeys, TravelLogKey } from "@/models/TravelLog/TravelLog";
import { zodResolver } from "@hookform/resolvers/zod"

type TravelLogTypes = {
    label?: string,
    type: 'text' | 'url' | 'textarea' | 'number' | 'date' | 'password';
}

// TravelLogKey = 'title' | 'description' | 'image' | 'rating' | 'latitude' | 'longitude' | 'visitDate'
type TravelLogInputs = Record<TravelLogKey, TravelLogTypes>

const travelLogInputs: TravelLogInputs = {
    title: {
        type: 'text'
    },
    description: {
        type: 'textarea'
    },
    image: {
        type: "url"
    },
    rating: {
        type: "number"
    },
    latitude: {
        type: "number"
    },
    longitude: {
        type: "number"
    },
    visitDate: {
        type: "date",
        label: 'Visit Date'
    }
}


//getting current date
const now = new Date();
const padNum = (input: number) => input.toString().padStart(2, '0');
const nowString = `${now.getFullYear()}-${padNum(now.getMonth() + 1)}-${padNum(
    now.getDate()
)}`;


// a custom form input renderer
export default function TravelLogForm() {
    //zod resolver validates our form types, we can show validation errors
    const { register, handleSubmit, formState: { errors } } = useForm<TravelLog>({
        resolver: zodResolver(TravelLog),
        defaultValues: {
            title: '',
            description: '',
            rating: 5,
            // latitude: state.currentMarkerLocation?.lat,
            // longitude: state.currentMarkerLocation?.lng,
            // @ts-ignore
            visitDate: nowString,
            // apiKey: localStorage.getItem('apiKey') ?? '',
        },
    });
    const onSubmit: SubmitHandler<TravelLog> = async (data) => {
        console.log(data)

        //post request
        const response = await fetch('api/logs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })

        const json = await response.json();
        console.log(json)

    };


    // "handleSubmit" will validate your inputs before invoking "onSubmit" */ 

    return (
        <>
            <label htmlFor="my-modal" className="btn btn-primary absolute top-4 right-3">Add a Travel Spot</label>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <label htmlFor="my-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <form className="mx-auto max-w-md flex gap-4 flex-col" onSubmit={handleSubmit(onSubmit)}>

                        {Object.entries(travelLogInputs).map(([name, value]) => {
                            const key = name as TravelLogKey;
                            // console.log('vlue,', value)
                            console.log('name,', name)
                            console.log('value', value)
                            return (
                                <div key={name} className="form-control w-full min-w-full ">
                                    <label className="label">
                                        <span className="label-text">         {value.label || name}</span>
                                    </label>

                                    {value.type === 'textarea' ? (
                                        <div>

                                            <textarea
                                                // type="text"
                                                className={`textarea textarea-bordered w-full ${!!errors[key] ? 'textarea-error' : 'textarea-primary'} `}
                                                {...register(key)} />
                                            {errors[key] && <span>{errors[key]?.message}</span>}
                                        </div>

                                    ) : (
                                        <div>
                                            <input
                                                step="any"
                                                type={value.type}
                                                className={`input input-bordered w-full ${!!errors[key] ? 'input-error' : 'input-primary'} `}
                                                {...register(key)} />
                                            {errors[key] && <span>{errors[key]?.message}</span>}
                                        </div>

                                    )}

                                </div>
                            )
                        }

                        )}
                        <button className="btn btn-primary ">Create</button>
                    </form>

                </label>
            </label>
        </>

    )
}