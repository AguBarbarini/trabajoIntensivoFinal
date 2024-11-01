<template>
    <div>
      <h1>Listado de compras</h1>
      <NuevaCompra @addCompra="addCompra" @editCompra="editCompra" :compra="selectedCompra" />
      <TablaCompras :compras="compras" @editCompra="setSelectedCompra" @deleteCompra="deleteCompra" />
    </div>
</template>
<script>
/* eslint-disable */ 
import NuevaCompra from '@/components/NuevaCompra.vue';
import TablaCompras from '@/components/TablaCompras.vue';
  
export default {
    components: {
      NuevaCompra,
      TablaCompras
    },
    data() {
      return {
        compras: [], 
        selectedCompra: null, 
      };
    },
    created() {
      this.fetchCompras(); 
    },
    methods: {
     async fetchCompras() {
        try {
            const response = await fetch('https://api.yumserver.com/16390/generic/compras');
            const data = await response.json();
            this.compras = data; // Asignar los datos de la API al arrays compras
            console.log('Compras cargadas:', this.compras); 
        } catch (error) {
            console.error('Error al cargar compras:', error);
        }
     },  
     async addCompra(compra){
        try{
            const response = await fetch('https://api.yumserver.com/16390/generic/compras', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(compra)
            });

            if (response.ok) { 
                this.compras.push(compra)
                await this.fetchCompras() 
                this.selectedCliente = null; 
            } else {
            console.error('Error al agregar compra:', await response.text());      
            }
        } catch (error) {
            console.error('Error al agregar compra:', error)
        }
     },
     async editCompra(compra) {
        if (!compra || !compra.idcod) {
            console.error('Compra no válida o sin idcod');
            return; 
        }
        try {
            const response = await fetch(`https://api.yumserver.com/16390/generic/compras`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(compra),
            });
            if (response.ok) {
            console.log('Compra actualizada:', compra);
            await this.fetchCompras(); // Recarga la lista 
            this.selectedCompra = null; // Reseteo para que no quede selección
            } else {
            console.error('Error al editar compra:', await response.text());
            }
        }catch (error) {
          console.error('Error al editar compra:', error);
        }
     },
     async deleteCompra(compraId) {
        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta compra?');

        if (confirmDelete) {
            try {
                const response = await fetch(`https://api.yumserver.com/16390/generic/compras`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({idcod: compraId})
                });
                if (response.ok) {
                    const index = this.compras.findIndex(c => c.idcod === compraId) //Se busca el indice de la compra a eliminar
                    this.compras.splice(index, 1)
                } else {
                console.error('Error al eliminar compra:', await response.text());
                }
            } catch (error) {
                console.error('Error al eliminar compra:', error);
            }
        }
     },
     setSelectedCompra(compra) {
         this.selectedCompra = compra;
     },
    },
};
</script>
