Bmob.initialize("9602b490ca92389fd6cc9069c67fd251", "17cc6a11b0fb76dc3fdeb61b1c8cefe6");
const query = Bmob.Query('Student');
MuseUIToast.config({
    "position": "top-end"
})
Vue.component("form-edit", {
    props: ["data"],
    data: () => {
        return {
            addForm: {
                order: null,
                name: null,
                except: false,
                weight: 10
            }
        }
    },
    methods: {
        add() {
            if (!this.isEditMode) {
                query.set("order", parseInt(this.addForm.order))
                query.set("name", this.addForm.name)
                query.set("except", this.addForm.except)
                query.set("weight", parseInt(this.addForm.weight))
                query.save().then(res => {
                    this.$root.refresh()
                    this.$refs.addForm.clear()
                    this.addForm = {
                        order: (parseInt(this.addForm.order) + 1).toString(),
                        name: null,
                        except: false,
                        weight: 10
                    };
                }).catch(err => {
                    console.log(err)
                })
            } else {
                query.get(this.data.objectId).then(res => {
                    query.set("order", parseInt(this.addForm.order))
                    query.set("name", this.addForm.name)
                    query.set("except", this.addForm.except)
                    query.set("weight", parseInt(this.addForm.weight))
                    res.save().then(res => {
                        this.$root.refresh()
                    });
                }).catch(err => {
                    console.log(err)
                });
            }
        },
        delete() {
            if (this.isEditMode) {
                query.set("order", parseInt(this.addForm.order))
                query.set("name", this.addForm.name)
                query.set("except", this.addForm.except)
                query.set("weight", parseInt(this.addForm.weight))
                query.destroy(this.data.objectId).then(res => {
                    this.$root.refresh()
                    this.$refs.addForm.clear()
                    this.addForm = {
                        order: (parseInt(this.addForm.order) + 1).toString(),
                        name: null,
                        except: false,
                        weight: 10
                    };
                }).catch(err => {
                    console.log(err)
                })
            }
        },
    },
    computed: {
        isEditMode() {
            if (this.data != null) {
                this.addForm = this.data;
                return true
            }
            return false
        }
    },
    template: '<mu-form label-width="100" label-position="right" ref="addForm" :model="addForm"><mu-form-item label="学号" prop="order"><mu-text-field v-model="addForm.order" prop="order"></mu-text-field></mu-form-item><mu-form-item label="姓名" prop="name"><mu-text-field v-model="addForm.name" prop="name"></mu-text-field></mu-form-item><mu-form-item label="是否排除" prop="except"><mu-switch v-model="addForm.except"></mu-switch></mu-form-item><mu-form-item label="权重" prop="weight"><mu-text-field v-model="addForm.weight" prop="weight" type="number"></mu-text-field></mu-form-item><mu-form-item><mu-button color="primary" @click="add">{{!isEditMode ? "添加" : "保存"}}</mu-button></mu-form-item><mu-form-item v-if="isEditMode"><mu-button flat>删除</mu-button></mu-form-item></mu-form>'
});
Vue.use(MuseUI);
var app = new Vue({
    el: '#app',
    data: {
        loading: false,
        sort: {
            name: 'order',
            order: 'asc'
        },
        columns: [{
                title: '学号',
                name: 'order',
                sortable: true,
                align: "center"
            },
            {
                title: '姓名',
                name: 'name',
                sortable: true,
                align: "center"
            },
            {
                title: '是否排除',
                name: 'except',
                sortable: true,
                align: "center"
            },
            {
                title: '权重',
                name: 'weight',
                sortable: true,
                align: "center"
            },
        ],
        list: [],
    },
    methods: {
        refresh() {
            this.loading = true;
            query.order("order");
            query.find().then(res => {
                this.list = res;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            });
        },
        handleSortChange({
            name,
            order
        }) {
            this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
        },
        getUser() {
            return Bmob.User.current()
        },
        isAdmin() {
            if (this.getUser() != null) {
                if (this.getUser().isAdmin) {
                    return true;
                }
            }
            return false;
        },
    },
});
app.refresh()