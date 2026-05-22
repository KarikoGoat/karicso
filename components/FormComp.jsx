import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import * as emailjs from '@emailjs/browser';
import backArrow from '../public/backArrow.svg';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input className='rounded-sm p-2 h-1/2 opacity-60 w-full block' {...field} {...props} />
      {meta.touched && meta.error ? <div className='text-left text-[#C79753]'>{meta.error}</div> : null}
    </>
  );
};

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      {/*} <label className='text-white block' htmlFor={props.id || props.name}>{label}</label> */}
      <textarea className='rounded-sm p-2  opacity-60  w-full h-40' {...field} {...props} />
      {meta.touched && meta.error ? <div className='text-left text-[#C79753]'>{meta.error}</div> : null}
    </>
  );
};

const FormComp = (props) => {

  emailjs.init("dgRa1q9fTtk6kdqJt");
  const service_id = "service_r8om8id";
  const template_id = "template_qkvn6gc";

  const [popup, setPopup] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  
  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => {
        setTimeout(setPopup(false))
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [popup])


  return (
    <>
      <div className={"bg-background2 flex items-center relative h-fit p-16  -z-10  bg-cover bg-center"} ref={props.formRef}>
        <div className={"flex flex-col space-y-8 md:flex-row justify-between w-full items-center"}>
          <div className="flex flex-col space-y-4 items-center md:items-start md:w-1/3 md:ml-12">
            <div className="text-white text-4xl text-center md:text-left">Hogyan segíthetek Önnek?</div>
            <hr className="border-2 w-1/3   border-[#C79753] border-solid" />
            <div className="text-white text-center md:text-left">Kérem, ossza meg velem az igényeit, hogy személyre szabott ajánlatot tudjak készíteni Önnek.</div>
          </div>
          <div className={`bg-[#0c0a09]/70 rounded-md p-5 flex flex-col w-full  space-y-8 mx-8 items-center text-center md:text-left 
            md:w-2/5 md:mx-12 md:space-y-4` }>
              <h1 className="text-white text-4xl md:text-4xl lg:text-5xl text-center w-full">Ajánlatkérés</h1>
              <hr className="border-2 w-1/3  border-[#C79753] border-solid"/>
              <div className="w-full p-2 md:p-5 ">

                <Formik 
                  initialValues={{
                    name: "",
                    email: "",
                    number: "",
                    place: "",
                    message: "",
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string()
                      .max(100, "Legfeljebb 100 karakter")
                      .required("Kötelező"),
                    email: Yup.string().email("Nem megfelelő e-mail cím").required("Kötelező"),
                    number: Yup.string()
                      .max(30, "Legfeljebb 30 karakter")
                      .required("Kötelező"),
                    place: Yup.string()
                      .max(100, "Legfeljebb 100 karakter"),
                    message: Yup.string()
                    .max(500, "Legfeljebb 500 karakter")
                  })}
                  onSubmit={(values) => {
                    const template_params = {
                      name: values.name,
                      email: values.email,
                      number: values.number,
                      place: values.place,
                      message: values.message
                    }
                    emailjs.send(
                      service_id,
                      template_id,
                      template_params
                    ).then(res => {
                      setIsFirst(false);
                      setPopup(true)
                    }).catch(err => {
                      console.error('Error:', err)
                    })
                  }}
                >
                  <Form>  
                    <div className='flex flex-col items-center w-full space-y-4 '>
                      <div className="w-full">
                        <MyTextInput
                        label="Teljes Név"
                        name="name"
                        type="text"
                        placeholder="Teljen Név"
                        />
                      </div>
                      <div className='w-full'>
                        <MyTextInput
                        label="E-mail cím"
                        name="email"
                        type="email"
                        placeholder="E-mail cím"
                        />
                      </div>
                      <div className='w-full'>
                        <MyTextInput
                        label="Telefonszám"
                        name="number"
                        type="text"
                        placeholder="Telefonszám"
                        />
                      </div>
                      <div className='w-full'>
                        <MyTextInput
                        label="Település"
                        name="place"
                        type="text"
                        placeholder="Település (opcionális)"
                        />
                      </div>
                      <div className='w-full'>
                        <MyTextArea
                        label="Üzenet"
                        name="message"
                        type="text"
                        placeholder="Írja meg nekünk a részleteket!"
                        /> 
                      </div>
                      <button className='bg-gradient-to-b from-[#DBB164] to-[#C79753] p-2 w-1/2 
                      rounded-full md:w-2/3 lg:w-1/2 button-grow' type="submit">Küldés</button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
        </div>  
      </div>
      <div className={`text-sm fixed px-6 py-6 right-0 pr-28 drop-shadow-2xl bottom-16 z-50 text-center bg-[#EAC76D] 
          py-4 cssanimation sequence ${popup ? "fadeInRight" : "fadeOutRight"} ${isFirst ? "hidden" : "block"} `}>
            Email Sikeresen Elküldve!
      </div>
    </>
  )
}
export default FormComp
