import Image from "next/image"

const Placeholder = (
    {message, image, submitButton}:
     {message: string, image: string, submitButton?:boolean}) => {

    return (
        <div className="flex flex-col gap-5 w-full items-center mt-14">
            <Image
                alt={`Ilustrative image for ${message}`}
                width="215"
                height="215"
                src={image}
            />
            <div className="text-2xl">
                {message}
            </div>
            {submitButton ? <div>Submit Component </div> : <></>}

        </div>
    )
}

export { Placeholder }