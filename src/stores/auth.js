import api from "@/api/http";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const token = ref(localStorage.getItem('token'));
    const isLoggedIn = computed(() => !!token.value);

    async function fetchProfile() {
     
            const res = await api.get('auth/profile'); 
            user.value = res.data.data;
       
    }

    async function updateProfile(payload) {
      
            await api.put('/profile', payload);
            await fetchProfile(); 
       
    }

    async function uploadAvatar(file) {
        const fd = new FormData();
        fd.append('avatar', file);
        await api.post('/profile/avatar', fd);
        await fetchProfile();
    }

    async function login(email, password) {
        try {
            const res = await api.post('/auth/login', { email, password });
            user.value = res.data.data.user;
            token.value = res.data.data.token;
            localStorage.setItem('token', token.value);
        } catch (error) {
            throw error;
        }
    }

    async function logout() {
        localStorage.removeItem("token");
        token.value = null;
        user.value = null;
    }

    return { user, token, isLoggedIn, login, logout, fetchProfile, updateProfile, uploadAvatar };
});