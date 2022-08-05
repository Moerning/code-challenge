<template>
    <div class="flex flex-col h-full">
        <!-- Top Bar -->
        <div class="p-2">
            <div class="flex items-center justify-between">
                <div class="h-[50px]">
                    <img class="h-full" src="../../assets/shoppy.png" alt="">
                </div>
                <div class="flex items-center gap-2 cursor-pointer">
                    <div class="w-[40px] h-[40px] rounded-full overflow-hidden">
                        <img src="../../assets/blank-profile.png" class="h-full w-full" alt="">
                    </div>
                    <span>
                        Admin
                    </span>
                    <span class="icon-chevron-down"></span>
                </div>
            </div>
        </div>
        <div class="flex flex-grow">
            <!-- Left Side Panel -->
            <div class="w-[100px] bg-white cursor-pointer">
                <div v-for="item in menuItems" class="flex pt-2 hover:bg-secondary-light justify-center w-[100px] h-[100px]">
                    <img :src="item.image" class="w-[30px]" alt="">
                </div>
            </div>
            <div class="flex-grow">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const menuItems = [
    { image : "./assets/dashboard.svg" , functionality:() => {} },
    { image : "./assets/bookmark.svg" , functionality:() => {} },
    { image : "./assets/inventory.svg" , functionality:() => {} },
    { image : "./assets/assessment.svg" , functionality:() => {} },
    { image : "./assets/settings.svg" , functionality:() => {} },
]
 
</script>