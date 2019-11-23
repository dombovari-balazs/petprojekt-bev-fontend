<template>
    <div>
        <h1>
            Hello I'm a WineTable!
        </h1>
    <WineTableComponent/>

    </div> 
</template>

<script>
import  WineTableComponent  from "../components/WineTableComponent.vue";
export default {
    name : 'WineTable',
    components : {
        WineTableComponent,
    },
}
</script>

<style>

</style>