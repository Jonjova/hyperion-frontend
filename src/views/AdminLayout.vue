<template>
    <div class="admin" :class="{
        'sidebar-collapsed': isSidebarCollapsed,
        'sidebar-expanded': !isSidebarCollapsed
    }">
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
        transition: margin-left 0.25s ease;
    }

    .content-area {
        padding: 20px;
        min-height: calc(100vh - 64px - 60px);
        background-color: var(--background-color);
        /* Ajustar según header y breadcrumb */
    }

    /* ===== ESCRITORIO (769px o más) ===== */
    @media (min-width: 769px) {
        .sidebar-expanded .main-content {
            margin-left: 200px;
        }
        
        .sidebar-collapsed .main-content {
            margin-left: 50px;
        }
        
        .content-area {
            padding-left: 20px;
            padding-right: 20px;
        }
    }

    /* ===== MÓVIL (768px o menos) ===== */
    @media (max-width: 768px) {
        .content-area {
            padding-left: 76px;
        }
        
        /* El contenido queda fijo y hace scroll interno */
        .main-content {
            position: fixed;
            top: 64px;              /* altura del header */
            left: 0;
            width: 100%;
            height: calc(100vh - 64px);
            overflow-y: auto;
            background-color: inherit;
            z-index: 1;
        }

        /* El layout bajo header */
        .layout-container {
            position: relative;
            height: calc(100vh - 64px);
            overflow: hidden;
        }

        /* El sidebar NO debe empujar el contenido en móvil */
        .sidebar-expanded .main-content,
        .sidebar-collapsed .main-content {
            margin-left: 0 !important;
            width: 100% !important;
        }
    }
</style>