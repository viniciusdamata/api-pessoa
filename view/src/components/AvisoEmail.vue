<template>
<VApp light darken-4>
    <VContent>
        <VContainer fluid fill-height>
            <VLayout align-center justify-center>
                <VFlex xs12 sm8 md4>
                    <VCard color="blue darken-3" dark elevation-24 hover>
                        <VCardTitle primary-title>
                            <div>
                                <h3 class="headline mb-5">Obrigado <VIcon>verified_user</VIcon></h3>
                                <VCardText class="mb-5">Um link de verificação será enviado ao seu e-mail. Acesse-o para confirmar o cadastro. Esta janela já pode ser fechada.</VCardText>                     
                            </div>
                        </VCardTitle>
                    </VCard>                
                </VFlex>
            </VLayout>
        </VContainer>
    </VContent>
</VApp>
</template>

<script>
export default {
    name: 'AvisoEmail'
}
</script>

<style scoped>

</style>
