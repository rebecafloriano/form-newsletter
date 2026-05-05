import Form from "./components/Form"


function App() {

  return (
    <div className=" gap-2 pr-8  pl-8 flex flex-col justify-center items-center text-white min-h-screen bg-slate-900">
      <h1 className="font-bold text-white text-[2rem]">Inscreva-se</h1>
      <p className="text-center">Assine nossa Newsletter e mantenha-se informado</p>
      <div className="w-full sm:w-2/3 lg:w-1/3 flex flex-col gap-4">


        <div className='flex flex-col rounded-lg p-5 text-black bg-gray-300'>
          <Form />
        </div>


        <p className="text-center text-sm text-white">
          Ao se inscrever você passará a receber os nossos e-mails com as melhores dicas, novidades e ofertas.
        </p>

      </div>

    </div>
  )
}

export default App
