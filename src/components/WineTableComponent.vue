<template>
  <v-data-table
    :headers="wineHeaders"
    :items="wines"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="id"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>Expandable Table</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-toolbar-items>
        <v-btn text >{{counter}}</v-btn>

        <v-btn
        :loading="loading3"
        :disabled="loading3"
        color="blue-grey"
        class="ma-0 white--text"
        @click="() => {         // najó... ez már kicsit tényleg feketemágia
          loader = 'loading3';  
          exampleFetch()          // CARE!!! I left here a magic-constant:max-height
        }"
        max-height="42"
      >
        Fetch New Data
        <v-icon right dark>mdi-cloud-upload</v-icon>
      </v-btn>

      </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-switch  v-model="singleExpand" label="Single expand" ></v-switch>
        
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers }">
      <td :colspan="headers.length">Peek-a-boo!</td>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import  NewTableItem  from "./NewTableItem.vue";
export default {
  components : {
    NewTableItem
  },
  computed : {
    wines(){
      return this.$store.state.wines
    },
    counter() {
      return this.$store.state.fetchCount
    },
    formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    
  },
  methods : {
    exampleFetch (){
      this.$store.dispatch('doExampleFetch')
    },
    close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.wines[this.editedIndex], this.editedItem)
        } else {
          this.wines.push(this.editedItem)
        }
        this.close()
      },
      editItem (item) {
        this.editedIndex = this.wines.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.wines.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.wines.splice(index, 1)
      },
  },
    data () {
      return {
        dialog: false,
        editedItem : {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
        defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
        editedIndex: -1,

        expanded: [],
        loader: null,
        loading3: false,  // needed for fetching button
        singleExpand: false,
        wineHeaders: [
          {text : 'id', value : 'id'},
          {text : 'Megnevezés', value : 'megnevezes'},
          {text : 'Nettó Egységár', value : 'nettoEgysegar'},
          {text : 'Bruttó Egységár', value : 'bruttoEgysegar'},
          {text : 'Mennyiség', value : 'mennyiseg'},
          {text : 'Fizetendő', value : 'fizetendo'},
          {text : 'Eredeti Bruttó Egységár', value : 'eredetiBruttoEgysegar'},
          {text : 'Össz. Bruttó Jutalék', value : 'osszBruttoJutalek'},
          { text: 'Actions', value: 'action', sortable: false },

          { text: '', value: 'data-table-expand' },
        ],
      }
    },
    watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
    dialog (val) {
        val || this.close()
      },
  },
}
</script>


<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>