export const ATTRIBUTES = {
  USER: {
    DEPARTMENT: 'department',
    CLEARANCE_LEVEL: 'clearance_level',
    LOCATION: 'location'
  },
  RESOURCE: {
    TYPE: 'type',
    SENSITIVITY: 'sensitivity',
    OWNER: 'owner'
  },
  ENVIRONMENT: {
    TIME: 'time',
    IP_RANGE: 'ip_range'
  }
};

export const ABAC_POLICIES = [
  {
    id: 'finance_department_access',
    description: 'Solo personal de finanzas puede acceder a reportes financieros',
    rules: [
      {
        user: { department: 'finance' },
        resource: { type: 'financial_report' },
        action: 'read'
      }
    ]
  },
  {
    id: 'business_hours_access',
    description: 'Acceso restringido a horas laborales',
    rules: [
      {
        environment: {
          time: {
            start: '09:00',
            end: '18:00',
            days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
          }
        }
      }
    ]
  }
];