<template>
    <table>
      <thead>
        <tr>
          <th>Código |</th>
          <th>Nombre |</th>
          <th>Apellido</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.idcod">
          <td>{{ cliente.idcod }}</td>
          <td>{{ cliente.param1 }}</td>
          <td>{{ cliente.param2 }}</td>
          <td>
            <button class="edit-button" @click="$emit('editCliente', cliente)">Editar</button>
            <button class="delete-button" @click="$emit('deleteCliente', cliente.idcod)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
</template>
<script>
/* eslint-disable */ 
  export default {
    props: {
      clientes: {
        type: Array,
        required: true,
      },
    },
  };
</script>
  
  