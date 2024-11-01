<template>
  <form @submit.prevent="submit">
    <input v-model="localCompra.idcod" placeholder="ID del Cliente" readonly />
    <input v-model="localCompra.param1" placeholder="Producto" required />
    <input v-model="localCompra.param2" type="number" placeholder="Cantidad" required />
    <button type="submit">{{ isEditing ? 'Actualizar compra' : 'Guardar compra' }}</button>
  </form>
</template>
<script>
/* eslint-disable */ 
  export default {
    props: {
      compra: {
        type: Object,
        default: () => ({
          idcod: '',
          param1: '',
          param2: '',
        }),
      },
    },
    data() {
      return {
        localCompra: { ...this.compra },
        isEditing: false,
      };
    },
    watch: {
        compra(newCompra) {
            if (newCompra) {
            this.localCompra = { ...newCompra };
            this.isEditing = !!newCompra.idcod; 
            } else {
            this.localCompra = { idcod: '', param1: '', param2: '' }; 
            this.isEditing = false;
            }
        },
    },
    methods: {
      submit() {
        console.log('Datos a enviar:', this.localCompra);
        if (this.isEditing) {
          this.$emit('editCompra', { ...this.localCompra });
        } else {
          this.$emit('addCompra', { ...this.localCompra });
        }
        this.resetForm();
      },
      resetForm() {
        this.localCompra = { idcod: '', param1: '', param2: '' }; 
        this.isEditing = false; 
      },
    },
  };
</script>
<style>
form {
    max-width: 400px; /* Ancho máximo del formulario */
    margin: 20px auto; /* Centrar el formulario */
    padding: 20px; /* Espaciado interno */
    border: 1px solid #ccc; /* Borde del formulario */
    border-radius: 8px; /* Bordes redondeados */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra sutil */
    background-color: #ffffff; /* Color de fondo */
    transition: background-color 0.3s; /* Transición suave para el fondo */
}

form:hover {
    background-color: #f9f9f9; /* Color de fondo al pasar el mouse */
}

input {
    width: 100%; /* Ancho completo */
    padding: 12px; /* Espaciado interno */
    margin: 10px 0; /* Espaciado entre campos */
    border: 1px solid #ccc; /* Borde de los campos */
    border-radius: 4px; /* Bordes redondeados */
    font-size: 16px; /* Tamaño de fuente */
    box-sizing: border-box; /* Para que el padding no aumente el ancho total */
}

input:focus {
    border-color: #007bff; /* Color del borde al enfocar */
    outline: none; /* Eliminar el borde de enfoque predeterminado */
}

button.edit-button,
button.delete-button {
  padding: 5px 10px; /* Espaciado interno reducido */
  background-color: #28a745; /* Color de fondo para editar */
  color: #fff; /* Color del texto */
  border: none; /* Sin borde */
  border-radius: 4px; /* Bordes redondeados */
  font-size: 14px; /* Tamaño de fuente más pequeño */
  cursor: pointer; /* Cambiar el cursor al pasar por encima */
  margin-right: 5px; /* Espaciado a la derecha */
}

button.edit-button:hover {
  background-color: #218838; /* Color del botón editar al pasar por encima */
}

button.delete-button {
  background-color: #dc3545; /* Color de fondo para eliminar */
}

button.delete-button:hover {
  background-color: #c82333; /* Color del botón eliminar al pasar por encima */
}
</style>