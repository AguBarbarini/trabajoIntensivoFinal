<template>
    <div>
      <h1>Página exclusiva para clientes</h1>
      <NuevoCliente @addCliente="addCliente" @editCliente="editCliente" :cliente="selectedCliente" />
      <TablaClientes :clientes="clientes" @editCliente="setSelectedCliente" @deleteCliente="deleteCliente" />
    </div>
</template>
<script>
/* eslint-disable */ 
import NuevoCliente from '../components/NuevoCliente.vue';
import TablaClientes from '../components/TablaClientes.vue';
  
export default {
    components: {
      NuevoCliente,
      TablaClientes,
    },
    data() {
      return {
        clientes: [], 
        selectedCliente: null,
      };
    },
    created() {
      this.fetchClientes(); 
    },
  methods: {
    async fetchClientes() {
        try {
          const response = await fetch('https://api.yumserver.com/16390/generic/clientes');
          const data = await response.json();
          this.clientes = data; 
          console.log('Clientes cargados:', this.clientes); 
        } catch (error) {
          console.error('Error al cargar clientes:', error);
        }
    },
    async addCliente(cliente) {
        try {
          const response = await fetch('https://api.yumserver.com/16390/generic/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
          });

          if (response.ok) { 
            this.clientes.push(cliente)
            await this.fetchClientes()
            this.selectedCliente = null;
          } else {
            console.error('Error al agregar cliente:', await response.text());
          }
        } catch (error) {
          console.error('Error al agregar cliente:', error);
        }
    },
    async editCliente(cliente) {
        if (!cliente || !cliente.idcod) {
            console.error('Cliente no válido o sin idcod');
            return; 
        }
        try {
          const response = await fetch(`https://api.yumserver.com/16390/generic/clientes`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente),
          });
          if (response.ok) {
          console.log('Cliente actualizado:', cliente);
          await this.fetchClientes(); 
          this.selectedCliente = null; 
        } else {
          console.error('Error al editar cliente:', await response.text());
        }
      } catch (error) {
            console.error('Error al editar cliente:', error);
        }
    },
    async deleteCliente(clienteId) {
        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este cliente?');

        if (confirmDelete) {
          try {
            const response = await fetch(`https://api.yumserver.com/16390/generic/clientes`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({idcod: clienteId})
            });
            if (response.ok) {
                const index = this.clientes.findIndex(c => c.idcod === clienteId)
                this.clientes.splice(index, 1)
            } else {
              console.error('Error al eliminar cliente:', await response.text());
            }
          } catch (error) {
            console.error('Error al eliminar cliente:', error);
          }
        }
    },
    setSelectedCliente(cliente) {
        this.selectedCliente = cliente; 
    },
  },
};
</script>
  
  
  
