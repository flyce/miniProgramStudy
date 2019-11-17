const paginationBev = Behavior({
    data: {
        dataArray: [],
        total: null,
        noneResult: false,
        loading: false
    },

    methods: {
        setMoreData(dataArray) {
            const tempArray = this.data.dataArray.concat(dataArray);
            this.setData({
                dataArray: tempArray
            });
        },

        getCurrentStart() {
            return this.data.dataArray.length;
        },

        setTotal(total) {
            console.log(total, total == 0)
            if(total == 0) {
                this.setData({
                    noneResult: true
                });
            }
            this.data.total = total;
        },

        hasMore() {
            if(this.data.dataArray.length >= this.data.total) {
                return false;
            }
            return true;
        },

        initialize() {
           this.setData({
               total: null,
               dataArray: [],
               noneResult: false,
               loading: false
           });
        },

        isLocked() {
            return this.data.loading;
        },
      
        locked() {
            this.setData({
                loading: true
            });
        },
      
        unLocked() {
            this.setData({
                loading: false
            });
        },
      
    }
});

export { paginationBev };