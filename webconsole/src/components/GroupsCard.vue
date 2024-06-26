<!--
=========================================================
* © 2024 Ronan LE MEILLAT for SCTG Development
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- And many others
-->
<template>
    <!-- ====== Table Section Start -->
    <section class="bg-white dark:bg-dark">
        <div class="container mx-auto">
            <div class="flex flex-wrap -mx-4">
                <div class="w-full px-4">
                    <div class="max-w-full overflow-x-auto">
                        <table class="w-full table-auto">
                            <thead class="bg-slate-400">
                                <tr class="text-center bg-primary">
                                    <th
                                        class="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                        Guid
                                    </th>
                                    <th
                                        class="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                        Name
                                    </th>
                                    <th
                                        class="w-1/6 min-w-[160px] border-r border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                        Note
                                    </th>
                                    <th>
                                        <Menu as="div" class="relative inline-block text-left">
                                            <div>
                                                <MenuButton
                                                    class="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                                    Actions
                                                </MenuButton>
                                            </div>

                                            <transition enter-active-class="transition duration-100 ease-out"
                                                enter-from-class="transform scale-95 opacity-0"
                                                enter-to-class="transform scale-100 opacity-100"
                                                leave-active-class="transition duration-75 ease-in"
                                                leave-from-class="transform scale-100 opacity-100"
                                                leave-to-class="transform scale-95 opacity-0">
                                                <MenuItems
                                                    class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                    <div class="px-1 py-1">
                                                        <MenuItem v-slot="{ active }">
                                                        <button @click="toggle_add_group" :class="[
                                                            active ? 'bg-slate-400 text-white' : 'text-gray-900',
                                                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                                        ]">
                                                            Add group
                                                        </button>
                                                        </MenuItem>
                                                    </div>
                                                </MenuItems>
                                            </transition>
                                        </Menu>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="group in groups" :key="group.guid">
                                    <td
                                        class="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                        <ClipboardButton>{{ group.guid }}</ClipboardButton>
                                    </td>
                                    <td
                                        class="text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                        {{ group.name }}
                                    </td>
                                    <td
                                        class="text-dark border-b border-[#E8E8E8] bg-white dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                        {{ group.note }}
                                    </td>
                                    <td
                                        class="text-dark border-b border-r border-[#E8E8E8] bg-[#F3F6FF] dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                        <a @click="toggle_edit_group(group.guid)"
                                            class="inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium">
                                            Edit
                                        </a>
                                        <a @click="delete_group(group.guid)"
                                            class="ml-1 inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium">
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- ====== Table Section End -->
    <AddGroup v-if="bModalAddGroup" @add_group_close="toggle_add_group"
        @group_added="refresh_groups(); bModalAddGroup = false" />
    <EditGroup v-if="bModalEditGroup" @edit_group_close="toggle_edit_group"
        @group_updated="refresh_groups(); bModalEditGroup = false" :uuid="uuid" />
</template>
<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { onMounted, ref } from 'vue';
import { Group, GroupApi } from '@/api';
import { getGroups } from '@/utilities/api';
import AddGroup from './AddGroup.vue';
import EditGroup from './EditGroup.vue';
import ClipboardButton from './ClipboardButton.vue';
import { useUserStore } from '@/stores/sctgDeskStore';
const bModalAddGroup = ref(false);
const bModalEditGroup = ref(false);
const uuid = ref("");
const groups = ref([] as Group[]);


onMounted(() => {
    refresh_groups();
});

/**
 * Refreshes the groups by fetching the latest data from the API and updating the `groups` value.
 *
 * @return {Promise<void>} A promise that resolves when the groups are successfully refreshed.
 */
function refresh_groups(): void {
    getGroups().then((_groups) => {
        groups.value = _groups;
    });
}

/**
 * Deletes a group using the GroupApi service.
 *
 * @param {string} groupGuid The GUID of the group to delete.
 * @return {void} This function does not return anything.
 */
function delete_group(groupGuid: string): void {
    if (confirm("Are you sure you want to delete this group?")) {
        const groupApi = new GroupApi(useUserStore().api_configuration);
        groupApi.groupDelete([], groupGuid).then(() => {
            refresh_groups();
        });
    }
}
/**
 * Toggles the value of `bModalAddGroup` to show or hide the AddGroup component.
 *
 * @return {void} This function does not return anything.
 */
function toggle_add_group(): void {
    bModalAddGroup.value = !bModalAddGroup.value;
}

/**
 * Toggles the value of `bModalEditGroup` to show or hide the EditGroup component.
 *
 * @return {void} This function does not return anything.
 */
function toggle_edit_group(groupGuid: string): void {
        uuid.value = groupGuid;
        bModalEditGroup.value = !bModalEditGroup.value;
}
</script>