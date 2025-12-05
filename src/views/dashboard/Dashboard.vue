<template>
    <div class="dashboard">
        <DashboardStats :stats="stats" />
        <div class="dashboard-grid">
            <div class="recent-activity">
                <h2>Actividad Reciente</h2>
                <div class="activity-list">
                    <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
                        <i class="activity-icon" :class="activity.icon"></i>
                        <div class="activity-content">
                            <p class="activity-text">{{ activity . text }}</p>
                            <span class="activity-time">{{ activity . time }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="quick-actions">
                <h2>Acciones Rápidas</h2>
                <div class="actions-grid">
                    <BaseButton v-for="action in quickActions" :key="action.label" :variant="action.variant"
                        @click="handleAction(action)" class="action-button">
                        <i class="button-icon" :class="action.icon"></i>
                        {{ action . label }}
                    </BaseButton>
                </div>
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
    import Sidebar from '@/components/layout/Sidebar.vue';
    import Breadcrumb from '@/components/layout/Breadcrumb.vue';
    import DashboardStats from '@/components/features/dashboard/DashboardStats.vue';
    import BaseButton from '@/components/ui/BaseButton.vue';

    export default {
        name: 'AppDashboard',
        components: {
            AppHeader,
            Sidebar: Sidebar,
            Breadcrumb,
            DashboardStats,
            BaseButton
        },
        data() {
            return {
                //sidebarCollapsed: false,
                stats: [{
                        title: 'Total Usuarios',
                        value: '150',
                        icon: 'pi pi-users',
                        color: '#1976d2'
                    },
                    {
                        title: 'Total Categorías',
                        value: '45',
                        icon: 'pi pi-folder',
                        color: '#388e3c'
                    },
                    {
                        title: 'Roles Activos',
                        value: '8',
                        icon: 'pi pi-shield',
                        color: '#f57c00'
                    },
                    {
                        title: 'Permisos',
                        value: '120',
                        icon: 'pi pi-key',
                        color: '#7b1fa2'
                    }
                ],
                recentActivities: [{
                        id: 1,
                        icon: 'pi pi-user-plus',
                        text: 'Nuevo usuario registrado',
                        time: 'Hace 5 min'
                    },
                    {
                        id: 2,
                        icon: 'pi pi-file',
                        text: 'Categoría actualizada',
                        time: 'Hace 15 min'
                    },
                    {
                        id: 3,
                        icon: 'pi pi-lock',
                        text: 'Permisos modificados',
                        time: 'Hace 30 min'
                    }
                ],
                quickActions: [{
                        label: 'Gestionar Usuarios',
                        variant: 'primary',
                        route: '/admin/users',
                        icon: 'pi pi-users'
                    },
                    {
                        label: 'Ver Categorías',
                        variant: 'secondary',
                        route: '/categorias',
                        icon: 'pi pi-folder'
                    },
                    {
                        label: 'Gestionar Roles',
                        variant: 'success',
                        route: '/admin/roles',
                        icon: 'pi pi-shield'
                    }
                ]
            };
        },
        computed: {
            ...mapGetters('users', ['users']),
            ...mapGetters('sidebar', ['isSidebarCollapsed']),
            breadcrumbItems() {
                return [{
                    text: 'Dashboard',
                    to: '/dashboard'
                }];
            }
        },
        methods: {
            ...mapActions('users', ['fetchUsers', 'deleteUser']),
            ...mapActions('sidebar', ['toggleSidebar']),
            expanded() {
                this.toggleSidebar();
            },
            handleAction(action) {
                this.$router.push(action.route).catch(err => {
                    // Ignorar error de navegación redundante
                    if (err.name !== 'NavigationDuplicated') {
                        throw err;
                    }
                });
            }
        },
        mounted() {
            if (!this.$auth.isAuthenticated) {
                this.$router.push('/login');
            }
        }
    };
</script>

<style scoped>

    /* SOLUCIÓN RESPONSIVA */
    .dashboard-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        margin-top: 2rem;
    }

    .recent-activity,
    .quick-actions {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        min-width: 0;
    }

    .recent-activity h2,
    .quick-actions h2 {
        margin-top: 0;
        margin-bottom: 1rem;
        color: #333;
        font-size: 1.25rem;
    }

    .activity-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .activity-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid #f0f0f0;
        border-radius: 6px;
        transition: all 0.3s ease;
    }

    .activity-item:hover {
        background-color: #f9f9f9;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    /* Iconos minimalistas para actividades */
    .activity-icon {
        font-size: 1.1rem;
        color: linear-gradient(to right, #000000da, #434343);
        /* Color único azul suave */
        background: #e3f2fd;
        padding: 8px;
        border-radius: 8px;
        flex-shrink: 0;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }

    .activity-item:hover .activity-icon {
        background: linear-gradient(to right, #000000da, #434343);
        color: white;
    }

    .activity-content {
        flex: 1;
        min-width: 0;
    }

    .activity-text {
        margin: 0 0 0.25rem 0;
        font-weight: 500;
        word-wrap: break-word;
        overflow-wrap: break-word;
        color: #333;
    }

    .activity-time {
        font-size: 0.875rem;
        color: #666;
    }

    .actions-grid {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .action-button {
        width: 100%;
        justify-content: flex-start;
        padding-left: 1rem;
        gap: 0.75rem;
        transition: all 0.3s ease;
    }

    /* Iconos para botones */
    .button-icon {
        font-size: 1rem;
        color: currentColor;
        opacity: 0.9;
    }

    .action-button:hover .button-icon {
        opacity: 1;
        transform: translateX(2px);
    }

    /* Ajustes adicionales para móviles */
    @media (max-width: 767px) {
        .content-area {
            padding: 16px;
        }

        .dashboard-grid {
            gap: 1rem;
            margin-top: 1.5rem;
        }

        .recent-activity,
        .quick-actions {
            padding: 1rem;
        }

        .activity-item {
            padding: 0.75rem;
            gap: 0.75rem;
        }

        .activity-icon {
            width: 32px;
            height: 32px;
            font-size: 1rem;
            padding: 6px;
        }

        .action-button {
            padding-left: 0.75rem;
            gap: 0.5rem;
        }
    }
</style>
