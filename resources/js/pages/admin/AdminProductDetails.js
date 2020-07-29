import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useCommonService, useAdminProductService } from '../../hooks/HookManager'

export default function AdminProductDetails(props) {
  const CommonService = useCommonService()
  const curType = 'product-details'
  // variables
  const fileInputRef = useRef()
  const curAction = props.match.params.action
  const { userInputs, errors, handleChange, handleBlur, isEditing, isSubmitDisabled, mainImage, otherImages,
    handleSubmitCreate, handleSubmitEdit, handleSelectedFileMainImg, handleSelectedFileOtherImgs} = useAdminProductService(null, curType, curAction, fileInputRef)
  const { lsCategories } = useSelector(state => ({
    lsCategories: state.admin.lsCategories
  }))
  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-sm-12 admin-title">
          <h3 className="font-alt">{curAction} Product</h3>
          <hr className="divider-w mt-10 mb-20" />
          <form className="form" onSubmit={isEditing ? handleSubmitEdit : handleSubmitCreate}>
            <div className="row">
              {/* name */}
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="firstname">Name</label>
                  <input className="form-control" id="name" type="text" name="name" placeholder="Enter name" maxLength="150"
                    onChange={handleChange} onBlur={handleBlur} value={userInputs.name.value} />
                  <p className="text-danger">{errors.name ? errors.name : ''}</p>
                </div>
              </div>
              {/* price */}
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="phone">Price</label>
                  <input className="form-control" id="price" type="number" pattern="[0-9]*" name="price" placeholder="Enter price" maxLength="12"
                    onChange={handleChange} onBlur={handleBlur} value={userInputs.price.value} />
                  <p className="text-danger">{errors.price ? errors.price : ''}</p>
                </div>
              </div>
              <div className="clearfix"></div>
              {/* category */}
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select className="form-control col-sm-3" id="category" name="category_id" onChange={handleChange} value={userInputs.category_id.value}>
                    {
                      lsCategories.length > 0 &&
                      lsCategories.map((item, i) =>
                        <option value={item.id} key={item.id}>{item.name}</option>
                      )
                    }
                  </select>
                </div>
              </div>
              {/* origin */}
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="phone">Origin</label>
                  <input className="form-control" id="origin" type="text" name="origin" placeholder="Enter origin" maxLength="50"
                    onChange={handleChange} onBlur={handleBlur} value={userInputs.origin.value} />
                  <p className="text-danger">{errors.origin ? errors.origin : ''}</p>
                </div>
              </div>
              <div className="clearfix"></div>
              {/* Image */}
              <div className="col-sm-6 upload-product-container">
                <div className="upload-product-radio">
                  <input id="check_type_file" name="imageType" type="radio" value="imageFile" onChange={handleChange} checked={userInputs.imageType.value === 'imageFile'} />
                  <label htmlFor="imageType"> Main Image File</label>
                </div>
                <div className={"upload-product-box" + (userInputs.imageType.value === 'imageFile' ? '' : ' disabled')}>
                  <div className="upload-action">
                    <img src={CommonService.generateImageSrc('products', null, mainImage.src)} />
                    <input id="productImg" type="file" onChange={handleSelectedFileMainImg} ref={fileInputRef} />
                    <button type="button" className="btn btn-neutral btn-round" onClick={() => fileInputRef.current.click()} disabled={userInputs.imageType.value !== 'imageFile'}>Choose Image</button>
                  </div>
                    <h6>Filename: {(fileInputRef.current && fileInputRef.current.files[0]) ? fileInputRef.current.files[0].name : 'No file chosen'}</h6>
                  <h6 className="mt-0">Max size: 2Mb</h6>
                  <h6 className="my-0">Dimensions: 665x750</h6>
                </div>
              </div>
              <div className="col-sm-6 upload-product-container">
                <div className="upload-product-radio">
                  <input id="check_type_url" name="imageType" type="radio" value="imageURL" onChange={handleChange} checked={userInputs.imageType.value === 'imageURL'} />
                  <label htmlFor="imageType"> Main Image URL</label>
                </div>
                <div className={"upload-product-box" + (userInputs.imageType.value === 'imageURL' ? '' : ' disabled')}>
                  <div className="upload-action">
                    <img src={CommonService.generateImageSrc('products', null, mainImage.src)} />
                    <input className="form-control" id="input_image" type="text" name="input_image" placeholder="Enter image url" maxLength="255"
                      onChange={handleChange} value={mainImage.src} disabled={userInputs.imageType.value !== 'imageURL'} />
                  </div>
                </div>
              </div>
              {/* Other Images */}
              <div className="col-sm-12 mt-4">
                <label htmlFor="imageType"> Other Images</label>
                <div className="upload-product-box">
                  
                </div>
              </div>
              {/* Description */}
              <div className="col-sm-12 mt-4">
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea className="form-control" id="description" name="description" placeholder="Enter description" rows="10"
                    onChange={handleChange} onBlur={handleBlur} value={userInputs.description.value} />
                </div>
              </div>
              {/* actions */}
              <div className="col-sm-12 mt-4 text-right">
                <button className="btn btn-b btn-round" type="submit" disabled={isSubmitDisabled}>{isEditing ? 'Update' : 'Create'}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
