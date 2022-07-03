<Transition.Root show={openRegister} as={Fragment}>
  <Dialog
    as="div"
    className="fixed z-10 inset-0 overflow-y-auto"
    initialFocus={cancelButtonRef}
    onClose={setOpenRegister}
  >
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>

      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-28 sm:align-middle w-96">
          <div class="rounded-lg">
            <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h1 class="text-brand-font-color text-4xl font-[Avenir-Black]">
                Sign Up
              </h1>
              {/* {message && message} */}
              <form>
                <div className="space-y-5">
                  <label htmlFor="name" class="sr-only">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    // value={name}
                    // onChange={handleChange}
                    required
                    placeholder="Name"
                    class="text-black bg-input-brown relative block w-full px-3 py-2 border-2 border-brand-font-color rounded-md focus:outline-none placeholder-gray-500 focus:border-amber-900 focus:z-10"
                  />
                  <label htmlFor="email" class="sr-only">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    // value={email}
                    // onChange={handleChange}
                    required
                    placeholder="Email"
                    class="text-black bg-input-brown relative block w-full px-3 py-2 border-2 border-brand-font-color rounded-md focus:outline-none placeholder-gray-500 focus:border-amber-900 focus:z-10"
                  />
                  <label htmlFor="password" class="sr-only">
                    password Address
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    // value={password}
                    // onChange={handleChange}
                    required
                    placeholder="Password"
                    class="text-black bg-input-brown relative block w-full px-3 py-2 border-2 border-brand-font-color rounded-md focus:outline-none placeholder-gray-500 focus:border-amber-900 focus:z-10"
                  />
                </div>
                <button className="bg-brand-font-color text-white font-bold text-lg w-full px-3 py-1.5 rounded-md mt-8 mb-2 hover:bg-brand-red-hover ">
                  Sign Up
                </button>
                <div className="mt-3 mb-5 text-center">
                  <p>
                    Already have an account ? Klik
                    <button
                      className="font-bold ml-1"
                      onClick={() =>
                        setOpenLogin(!openLogin) || setOpenRegister(false)
                      }
                    >
                      Here
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Transition.Child>
    </div>
  </Dialog>
</Transition.Root>;
