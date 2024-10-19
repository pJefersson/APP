const {select,input} = require ('@inquirer/prompts')
const meta = {value:"Teste", checked: false}
const metas = [meta]

const cadastrar = async () =>{
   
    const meta  = await input({
        message:"Digite a meta",
       
    })
    if (meta.length == 0 ){
        console.log("A meta não pode ser vazia")
        return
    }
   metas.push(meta) 

}

const listarMetas = async () => {
    console.log(metas)
    
}

const start = async () =>{
    while(true){
        const opcao = await select({
            message:"Menu",
            choices:[
                {
                    name:"Cadastrar",
                    value:"cadastrar"
                },
                {
                    name:"Listar Metas",
                    value:"listar"
                },
                {
                    name:"Sair",
                    value:"sair"
                }
            ]
        })

        switch(opcao){
            case "cadastrar":
                await cadastrar()
                break
            case "listar":
                await listarMetas()
            case "sair":
                console.log("até logo")
            return
        }
    }
}
start()