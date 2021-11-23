<template>
<Layout name="LayoutDefault">
    <div v-show="isLogin">
        <h1>home page</h1>
        <p v-if="user">Hi {{user.name}}</p>
    </div>
</Layout>
</template>

<script>
import Layout from '@/layouts/Layout';
import axios from "axios"
export default {
    components: {
        Layout
    },
    data() {
        return {
            user: null
        }

    },
    created() {

        axios.get('https://mmt-web.herokuapp.com/api/user', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }).then(response => {
            this.user = response.data;
            console.log(response.data.name)
        }).catch(error => {
            console.log(error)
        })
    },
    computed: {
        isLogin() {
            return this.$store.getters['login/isLogin']
        }
    }
}
</script>
