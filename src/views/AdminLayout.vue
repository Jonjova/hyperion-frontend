<template>
    <div class="admin">
        <AppHeader :title="title" />
        <div class="admin-layout">

            <div class="layout-container">
                <AppSidebar :collapsed="isSidebarCollapsed" @toggle="expanded" />

                <main class="main-content">
                    <AppBreadcrumb v-if="showBreadcrumb" :items="breadcrumbItems" />

                    <div class="content-area">
                    <router-view />
                    </div>
                </main>
            </div>
        </div>

    </div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppSidebar from '@/components/layout/Sidebar.vue';
import AppBreadcrumb from '@/components/layout/Breadcrumb.vue';

export default {
    name: 'AdminLayout',
    components: {
        AppHeader,
        AppSidebar,
        AppBreadcrumb
    },
    props: {
        title: String,
        showBreadcrumb: {
            type: Boolean,
            default: true
        },
    },
    computed: {
        ...mapGetters('sidebar', ['isSidebarCollapsed']),
        breadcrumbItems() {
            return this.$route.meta?.breadcrumb || [];
        },
    },
    methods: {
        ...mapActions('sidebar', ['toggleSidebar']),
        expanded() {
            this.toggleSidebar();
        },
    }
};
</script>

<style scoped>
    .admin-layout {
        min-height: 100vh;
        background-color: var(--bg-color, #f8f9fa);
    }

    .layout-container {
        display: flex;
        min-height: calc(100vh - 64px);
    }

    .main-content {
        flex: 1;
        padding: 0;
        background-color: inherit;
    }

    .content-area {
        padding: 20px;
        min-height: calc(100vh - 64px - 60px);
        /* Ajustar según header y breadcrumb */
    }

    /* Estilos responsivos unificados */
    @media (min-width: 768px) {
        .content-area {
            padding-right: 10px;
            padding-left: 58px;
        }
    }

    @media (max-width: 767px) {
        .content-area {
            padding: 76px;
        }
    }
</style>
