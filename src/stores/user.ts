import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
    const user = ref({
        id: "",
        username: "",
        token: "",
        type:""
    });
    const isLogin = computed(() => {
        return user.value.token !== "";
    });
    const login = (userInfo: { id: string; username: string; token: string;type:string }) => {
        user.value = userInfo;
    };
    const logout = () => {
        user.value = {
            id: "",
            username: "",
            token: "",
            type:""
        };
    };
    return {
        user,
        isLogin,
        login,
        logout
    };
});