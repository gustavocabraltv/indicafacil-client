import Search from "@/components/Search";
import Wrapper from "@/components/Wrapper";

export default function Home() {

    return (


        <>
        <Search/>
            <div id='highlight' className=" overflow-hidden flex flex-col">


                <div className="flex gap-4 px-4 pt-4">

                    <div className="card-default">
                        <h1>Pintura <br />Residencial</h1>
                    </div>

                    <div className="card-default">
                        <h1>Serviço<br />de  Limpeza</h1>
                    </div>

                </div>


                <div id='scroll' className="flex overflow-x-auto whitespace-nowrap gap-2 scrollbar-hide p-4">

                    <div
                        className="card-info">
                        <div className="bg-gray-200 w-full h-22 rounded-xs flex items-center justify-center text-black">Imagem</div>
                        <h1>Packers <br />& Movers</h1>
                    </div>

                    <div
                        className="card-info">
                        <div className="bg-gray-200 w-full h-22 rounded-xs flex items-center justify-center text-black">Imagem</div>
                        <h1>Packers <br />& Movers</h1>
                    </div>

                    <div
                        className="card-info">
                        <div className="bg-gray-200 w-full h-22 rounded-xs flex items-center justify-center text-black">Imagem</div>
                        <h1>Packers <br />& Movers</h1>
                    </div>


                    <div
                        className="card-info">
                        <div className="bg-gray-200 w-full h-22 rounded-xs flex items-center justify-center text-black">Imagem</div>
                        <h1>Packers <br />& Movers</h1>
                    </div>


                    <div
                        className="card-info">
                        <div className="bg-gray-200 w-full h-22 rounded-xs flex items-center justify-center text-black">Imagem</div>
                        <h1>Packers <br />& Movers</h1>
                    </div>


                    <div
                        className="card-info">
                        <div className="bg-gray-200 w-full h-22 rounded-xs flex items-center justify-center text-black">Imagem</div>
                        <h1>Packers <br />& Movers</h1>
                    </div>

                    <div
                        className="card-info">
                        <div className="bg-gray-200 w-full h-22 rounded-xs flex items-center justify-center text-black">Imagem</div>
                        <h1>Packers <br />& Movers</h1>
                    </div>



                </div>

            </div>



            <div id='services-1' className=" overflow-hidden flex flex-col">


                <h1 className="text-black text-2xl p-4 font-semibold">Explore outros serviços</h1>

                <div id='scroll' className="flex overflow-x-auto whitespace-nowrap gap-2 scrollbar-hide p-4">




                    <div
                        className="card-base justify-end min-w-40 h-48">
                            <span className="text-xs">⭐ 4.9</span>
                        <h1>Limpeza <br/> de banheiro</h1>
                    </div>


                    <div
                        className="card-base justify-end min-w-40 h-48">
                            <span className="text-xs">⭐ 4.9</span>
                        <h1>Serviços <br/> Elétricos</h1>
                    </div>

                    <div
                        className="card-base justify-end min-w-40 h-48">
                            <span className="text-xs">⭐ 4.9</span>
                        <h1>Pequenos <br/> reparos</h1>
                    </div>

                    <div
                        className="card-base justify-end min-w-40 h-48">
                            <span className="text-xs">⭐ 4.9</span>
                        <h1>Limpeza <br/> de banheiro</h1>
                    </div>

                    <div
                        className="card-base justify-end min-w-40 h-48">
                            <span className="text-xs">⭐ 4.9</span>
                        <h1>Limpeza <br/> de banheiro</h1>
                    </div>

                    <div
                        className="card-base justify-end min-w-40 h-48">
                            <span className="text-xs">⭐ 4.9</span>
                        <h1>Limpeza <br/> de banheiro</h1>
                    </div>













                </div>ß


            </div>



            <div id='services-2'>

                <h1 className="text-black text-2xl p-4 font-semibold">Serviços mais pedidos</h1>

                <div className="gap-4 p-4 grid-cols-2 grid text-sm">

                    <div className=" bg-gray-100 h-40 w-full p-4 flex items-end text-black rounded-md">
                        <div className="flex justify-between w-full">
                            <h1>Packers & Movers</h1>
                            <div>⭐</div>
                        </div>
                    </div>

                    <div className=" bg-gray-100 h-40 w-full p-4 flex items-end text-black rounded-md">
                        <div className="flex justify-between w-full">
                            <h1>Packers & Movers</h1>
                            <div>⭐</div>
                        </div>
                    </div>

                    <div className=" bg-gray-100 h-40 w-full p-4 flex items-end text-black rounded-md">
                        <div className="flex justify-between w-full">
                            <h1>Packers & Movers</h1>
                            <div>⭐</div>
                        </div>
                    </div>

                    <div className=" bg-gray-100 h-40 w-full p-4 flex items-end text-black rounded-md">
                        <div className="flex justify-between w-full">
                            <h1>Packers & Movers</h1>
                            <div>⭐</div>
                        </div>
                    </div>





                </div>
            </div>





        </>








    )

}

