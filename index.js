const {select, input, checkbox} = require ('@inquirer/prompts')
let meta = {value:"Teste", checked: false}
let metas = [meta]
let mensangem = "Bem Vindo ao APP"

const cadastrar = async () =>{
   
    const meta  = await input({
        message:"Digite a meta"            
    })
    if (meta.length == 0 ){
        mensangem = "A meta não pode ser vazia"
        return
    }
   metas.push({value:meta, checked:false}) 

}

const listarMetas = async () => {
    
    const respostas = await checkbox({
        message:"Suas Metas: " + metas.length,
        choices:[...metas]
    })

    metas.forEach((m)=>{
        m.checked = false
    })

    if(respostas.length == 0 ){
        mensangem = "Nenhuma meta selecionada"
        
        return
    }
   
    respostas.forEach((resposta)=>{
        const meta = metas.find((m)=>{
            return m.value == resposta
        })
        meta.checked = true
    })

    mensangem = "Meta(s) marcada(s) como concluida(s)"
    return
    
}

const metasRealizadas =  async () => {
    const realizadas = metas.filter(()=>{
        return meta.checked
    })
    

    if(realizadas.length == 0){
        mensagem = "Não existem metas realizadas! :("
        return
    }

    await select({
        message:"Metas Realizadas: " + realizadas.length,
        choices: [...realizadas]
    })

}

const metasAbertas = async () => {
    const abertas = metas.filter((meta)=>{
        return meta.checked != true
    })
    
    if(abertas.length == 0) {
        mensangem = "Não existem metas abertas :)"
        return
    }

    await select({
        message: "Metas Abertas: " +abertas.length,
        choices: [...abertas]
    })  
    
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })

    const itensADeletar = await checkbox({
        message:"Suas Metas ",
        choices:[...metasDesmarcadas]
    })
    if(itensADeletar.length == 0){
        mensagem = "Nenhum item para deletar!"
        return
    }
    itensADeletar.forEach((item) =>{
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })
    mensangem = "Meta(s) deletada(s) com sucesso!"
}

const mostrarMensagem = () =>{
    console.clear();

    if(mensangem != ""){
        console.log(mensangem)
        console.log("")
        mensangem = ""
    }

}

const start = async () =>{
   
    while(true){
        mostrarMensagem()
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
                    name:"Metas Realizadas",
                    value:"realizadas"
                },
                {
                    name:"Metas Abertas",
                    value:"abertas"
                },
                {
                    name:"Deletar Metas",
                    value:"deletar"
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
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Até logo")
            return
        }
    }
}
start()