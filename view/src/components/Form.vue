<template>
    <v-app light>
        <v-content>
            <v-container fluid fill-height>
                <v-layout row wrap justify-center>
                    <v-flex xs12 sm8 md4>
                        <h1>Cadastro para o Sistema A.B.E.</h1>
                        <blockquote>Para simplificar os processos realizados pela Associação, uma aplicação online está em desenvolvimento. Precisamos que você realize esse cadastro para nos ajudar! Preencha os campos atentamente para que não haja erro ao enviar os dados. A Associação Bandeirantense de Estudantes agradece a sua cooperação. </blockquote>
                        <v-form ref="formulario">

                            <v-text-field
                                name="nome"
                                v-model="nome"
                                label="Nome completo"
                                :rules="validacaoNome"
                                required
                            ></v-text-field>
                          
                            <v-text-field
                                name="cpf"
                                v-model="cpf"
                                label="CPF"
                                :rules="validacaoCpf"
                                mask="###.###.###-##"
                                required
                            ></v-text-field>
                                              
                            <v-text-field
                                name="dataNasc"
                                :value="dataNasc"
                                label="Data de Nascimento"
                                mask="##-##-####"
                                return-masked-value
                
                            ></v-text-field>

                            <v-layout row wrap>
                                
                                <v-flex xs12 sm8 md4>
                                    <v-select
                                        :items="itensSangue"
                                        v-model="tipoSangue.tipo"
                                        label="Tipo Sanguíneo"
                                    ></v-select>
                                </v-flex>

                                <v-spacer></v-spacer>

                                <v-flex xs12 sm8 md3>
                                    <v-select
                                        :items="itensFator"
                                        v-model="tipoSangue.fator"
                                        label="Fator R.H."
                                    ></v-select>
                                </v-flex>
                                
                            </v-layout>                   

                            <v-layout row wrap>
                                
                                <v-flex xs12 sm8 md4>
                                    <v-text-field
                                        name="rg"
                                        v-model="rg"
                                        label="RG"
                                        :rules="validacaoRG"
                                        mask="#.###.###"
                                        required
                                    ></v-text-field>
                                </v-flex>

                                <v-spacer></v-spacer>

                                <v-flex xs12 sm8 md3>
                                    <v-text-field
                                        name="orgexp"
                                        v-model="orgexp"
                                        label="Órg. Exp."
                                        required
                                    ></v-text-field>
                                </v-flex>
                                
                            </v-layout>

                            <v-text-field
                                name="rua"
                                v-model="endereco.rua"
                                label="Rua"
                                :rules="validacaoNome"
                                required
                            ></v-text-field>

                            <v-layout row wrap>
                                
                                <v-flex xs12 sm8 md4>
                                    <v-text-field
                                        name="Bairro"
                                        v-model="endereco.bairro"
                                        label="Bairro"
                                        :rules="validacaoNome"
                                        required
                                    ></v-text-field>
                                </v-flex>

                                <v-spacer></v-spacer>

                                <v-flex xs12 sm8 md3>
                                    <v-text-field
                                        name="numero"
                                        v-model="endereco.numero"
                                        label="Número"
                                        required
                                    ></v-text-field>
                                </v-flex>
                                
                            </v-layout>

                            <v-text-field
                                name="curso"
                                v-model="curso"
                                label="Curso"
                                :rules="validacaoNome"
                                required
                            ></v-text-field>

                            <v-text-field
                                name="instDeEnsino"
                                v-model="instDeEnsino"
                                label="Instituição de Ensino"
                                :rules="validacaoNome"
                                required
                            ></v-text-field>
                            
                            <v-layout row wrap mb-5>
                                
                                <v-flex xs12 sm8 md6>        
                            
                                    <v-text-field
                                        name="email"
                                        v-model="email"
                                        label="E-mail"
                                        :rules="validacaoEmail"
                                        required
                                    ></v-text-field>
                                </v-flex>
                                <v-spacer></v-spacer>
                                <v-flex xs12 sm8 md4>
                                    
                                    <v-text-field
                                        name="tel"
                                        label="Telefone Celular"
                                        v-model="telefone"
                                        mask="(##)#####-####"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>

                            <h3>Área do Estudante</h3>
                            <blockquote>Em breve estaremos disponibilizando a área do estudante, onde você terá acesso aos seus boletos de mensalidade da Associação. Pedimos que escolha uma senha que será usada para efetuar o login futuramente. </blockquote>

                            <v-text-field
                                name="senha"
                                v-model="senha"
                                label="Senha"
                                :rules="validacaoSenha"
                                :type="senhaVisivel ? 'text' : 'password'"
                                :append-icon="senhaVisivel ? 'visibility' : 'visibility_off'"
                                @click:append="senhaVisivel = !senhaVisivel"
                                required
                            ></v-text-field>

                            <v-text-field
                                name="repitaSenha"
                                v-model="senhaTeste"
                                label="Digite novamente sua senha"
                                :rules="senhaValidada"
                                :type="senhaVisivel ? 'text' : 'password'"
                                :append-icon="senhaVisivel ? 'visibility' : 'visibility_off'"
                                @click:append="senhaVisivel = !senhaVisivel"
                                required
                            ></v-text-field>

                            <v-btn flat color="primary" @click="submit">
                                Enviar cadastro
                            </v-btn>

                            <v-alert type="success" :value="cadastroRealizado" outline>
                                Cadastro efetuado com sucesso
                            </v-alert>

                            <v-alert type="error" outline :value="cadastroErro">
                                Algo deu errado.
                            </v-alert>
                        </v-form>

                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import axios from 'axios'

export default { 

    name: 'Form',

    data(){
        
        return{

            nome: '',

            tipoSangue: {
                tipo: '',
                fator: ''
            },

            itensSangue: ['A', 'B', 'AB', 'O'],

            itensFator: ['+', '-'],

            dataNasc: null,

            validacaoNome: [
                v => v.length >= 3 || 'Campo inválido',
            ],

            cpf: '',

            rg: '',

            orgexp: '',

            validacaoRG: [
                v => v.length == 7 || 'RG Inválido'
            ],

            validacaoCpf: [
                v => this.validaCpf(v) || 'CPF Inválido'
            ],

            email: '',

            validacaoEmail: [
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Digite um e-mail válido'
            ],

            curso: '',

            instDeEnsino: '',

            endereco: {
                rua: '',
                numero: '',
                bairro: ''
            },

            telefone: '',

            senhaVisivel: false,

            senha: '',

            validacaoSenha: [
                v => v.length >= 6 || 'Sua senha precisa de no mínimo 6 caracteres'
            ],

            senhaTeste: '',

            senhaValidada: [
                v => v === this.senha || 'As senhas não são iguais'
            ],

            usuario: {},

            cadastroRealizado: false,

            cadastroErro: false

        }
    },

    methods:{

        validaCpf: function (cpf){

            var Soma;
            var Resto;
            Soma = 0;

            if (cpf == "00000000000") return false;
                
            for (let i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);

            Resto = (Soma * 10) % 11;
            
            if ((Resto == 10) || (Resto == 11))  Resto = 0;
            if (Resto != parseInt(cpf.substring(9, 10)) ) return false;
            
            Soma = 0;
            for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;
        
            if ((Resto == 10) || (Resto == 11))  Resto = 0;
            if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;
            return true;
        },

        submit: function(){

            if (this.$refs.formulario.validate()) {
                
                this.usuario = {
                    nome: this.nome,
                    email: this.email,
                    senha: this.senha,
                    cpf: this.cpf,
                    rg: this.rg,
                    orgexp: this.orgexp,
                    dataNasc: new Date(this.dataNasc),
                    tipoSangue: this.tipoSangue,
                    endereco: this.endereco,
                    instDeEnsino: this.instDeEnsino,
                    curso: this.curso,
                    telefone: this.telefone

                }

                axios.post('https://api-pessoa-node.herokuapp.com/users', this.usuario)
                .then((response) => {
                    
                    if (response.status === 200) {

                        this.cadastroRealizado = true
                        this.cadastroErro = false
                        this.$refs.formulario.reset()
                        this.$router.replace('finalizado')
                    }
                
                })
                .catch((error) => {

                    if (error) throw error

                    this.cadastroRealizado = false
                    this.cadastroErro = true                    
                })


                
            }
            else{
                this.cadastroRealizado = false
                this.cadastroErro = true
            }
        }
    }
}
</script>

<style scoped>
</style>